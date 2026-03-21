"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { createCheckoutSession, verifyPayment } from "@/actions/CheckoutAction";
import { ShoppingBag, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
  });

  // Load razorpay script
  useEffect(() => {
    setIsCartOpen(false); // Make sure cart drawer is closed
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [setIsCartOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setLoading(true);
    setErrorMsg("");

    const itemsPayload = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    // Start checkout session
    const res = await createCheckoutSession({
      ...formData,
      items: itemsPayload,
    });

    if (res.error) {
      setErrorMsg(res.error);
      setLoading(false);
      return;
    }

    // Open Razorpay Widget
    const options = {
      key: res.key, // Your razorpay api key
      amount: res.amount,
      currency: "INR",
      name: "DevInfotech",
      description: "Apparatus & Infrastructure Purchase",
      order_id: res.razorpayOrderId,
      prefill: {
        name: formData.customerName,
        email: formData.customerEmail,
        contact: formData.customerPhone,
      },
      theme: {
        color: "#0f172a", // slate-900
      },
      handler: async function (response: any) {
        setLoading(true);
        // Verify Signature
        const verifyRes = await verifyPayment(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature
        );

        if (verifyRes.error) {
          setErrorMsg(verifyRes.error);
          setLoading(false);
        } else {
          // Success!
          router.push(`/checkout/success?order_id=${res.orderId}`);
        }
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", function (response: any) {
      setErrorMsg(response.error.description);
      setLoading(false);
    });
    rzp.open();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24">
        <div className="text-center p-8 max-w-md">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <h2 className="text-2xl font-black text-slate-900 mb-2">Checkout Unavailable</h2>
          <p className="text-slate-500 mb-6">Your cart is empty. Please add items to your cart before proceeding.</p>
          <button 
            onClick={() => router.push("/products")} 
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 text-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-black mb-10 text-slate-900 tracking-tight">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Billing Form (7 cols) */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-3xl p-8 rounded-3xl border border-white shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] flex items-center justify-center shadow-sm">1</span>
              Billing & Shipping Details
            </h2>
            
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-bold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                  <input required name="customerName" value={formData.customerName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-[var(--primary-accent)] focus:ring-1 focus:ring-[var(--primary-accent)] transition-all font-medium text-slate-900 placeholder:text-slate-400" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                  <input required type="email" name="customerEmail" value={formData.customerEmail} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-[var(--primary-accent)] focus:ring-1 focus:ring-[var(--primary-accent)] transition-all font-medium text-slate-900 placeholder:text-slate-400" placeholder="john@company.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Phone Number</label>
                <input required type="tel" name="customerPhone" value={formData.customerPhone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-[var(--primary-accent)] focus:ring-1 focus:ring-[var(--primary-accent)] transition-all font-medium text-slate-900 placeholder:text-slate-400" placeholder="+91 98765 43210" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Shipping Address</label>
                <textarea required rows={3} name="customerAddress" value={formData.customerAddress} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-[var(--primary-accent)] focus:ring-1 focus:ring-[var(--primary-accent)] transition-all font-medium text-slate-900 placeholder:text-slate-400 resize-none" placeholder="Provide complete delivery address..." />
              </div>

              <div className="pt-6">
                <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white font-black text-lg py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3">
                  {loading ? (
                    <span className="w-6 h-6 rounded-full border-2 border-slate-500 border-t-white animate-spin"></span>
                  ) : (
                    <>
                      Pay ₹{cartTotal.toLocaleString("en-IN")}
                      <ShieldCheck className="w-5 h-5 text-green-400" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400 mt-4 font-medium flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Payments processed securely via Razorpay
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary (5 cols) */}
          <div className="lg:col-span-5 bg-white/40 backdrop-blur-3xl p-8 rounded-3xl border border-white/60 shadow-lg sticky top-32">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] flex items-center justify-center shadow-sm">2</span>
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0 hover:bg-white/50 p-2 rounded-xl transition-colors">
                  <div className="flex flex-col pr-4">
                    <span className="font-bold text-sm text-slate-800 line-clamp-1">{item.name}</span>
                    <span className="text-xs text-slate-500 font-medium tracking-wide">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 tracking-tight whitespace-nowrap">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-200">
              <div className="flex justify-between items-end mb-2">
                <span className="text-slate-500 font-medium">Total Execution Config</span>
                <span className="text-3xl font-black text-slate-900 tracking-tighter font-mono">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-right text-[10px] text-slate-400 font-bold uppercase tracking-widest">Inclusive of taxes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
