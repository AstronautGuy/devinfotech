"use server";

import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export interface CheckoutInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: {
    id: string; // Product id
    name: string;
    price: number;
    quantity: number;
  }[];
}

export async function createCheckoutSession(input: CheckoutInput) {
  try {
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay api keys are not configured.");
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const totalAmount = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create Razorpay Order
    const options = {
      amount: Math.round(totalAmount * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    
    let razorpayOrder;
    try {
      razorpayOrder = await razorpay.orders.create(options);
    } catch (rzpErr) {
       console.error("Razorpay order creation failed:", rzpErr);
       return { error: "Payment gateway initialization failed." };
    }

    // Save to database
    const supabase = await createClient();
    
    // Insert Order
    const { data: orderData, error: orderError } = await supabase
      .from("Order")
      .insert([
        {
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone,
          customerAddress: input.customerAddress,
          totalAmount: totalAmount,
          razorpayOrderId: razorpayOrder.id,
          status: "pending",
        },
      ])
      .select("id")
      .single();

    if (orderError) {
      console.error("Failed to insert Order:", orderError);
      return { error: "Failed to initialize order in the database." };
    }

    const orderId = orderData.id;

    // Insert Order Items
    const orderItemsPayload = input.items.map((item) => ({
      orderId: orderId,
      productId: item.id,
      productName: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase.from("OrderItem").insert(orderItemsPayload);

    if (itemsError) {
      console.error("Failed to insert Order Items:", itemsError);
      return { error: "Failed to record order details." };
    }

    return {
      success: true,
      orderId: orderId,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    };
  } catch (err: unknown) {
    console.error("Checkout Creation Error:", err);
    return { error: err instanceof Error ? err.message : "Internal Server Error" };
  }
}

export async function verifyPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return { error: "Server Configuration Error" };

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return { error: "Payment signature forged or invalid!" };
    }

    const supabase = await createClient();

    // Mark as paid
    const { error } = await supabase
      .from("Order")
      .update({
        status: "paid",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      })
      .eq("razorpayOrderId", razorpay_order_id);

    if (error) {
       console.error("Error updating order status:", error);
       return { error: "Payment was successful, but failed to update order status." };
    }

    return { success: true };
  } catch (err) {
    console.error("Verification Error:", err);
    return { error: "Verification Failed" };
  }
}
