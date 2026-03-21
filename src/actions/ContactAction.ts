"use server";

import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY || "fallback_key_for_build");

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Missing required fields" };
  }

  const supabase = await createClient();
  const { error: dbError } = await supabase
    .from("ContactTicket")
    .insert([{ name, email, subject, message }]);

  if (dbError) {
    console.error("Database Insert Error:", dbError);
    return { error: "Failed to save inquiry to the database." };
  }

  // Ensure Resend isn't disabled or unconfigured
  if (!process.env.RESEND_API_KEY) {
    console.warn("Resend API Key not found, mocking email submission.");
    // Simulate real network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, message: "Message mocked due to missing API key." };
  }

  try {
    const { error } = await resend.batch.send([
      {
        from: "DevInfotech Leads <onboarding@devinfotech.net>",
        to: ["info@devinfotech.net"], // Target delivery email
        subject: `New Lead: ${subject || "General Inquiry"} - ${name}`,
        text: `Client Name: ${name}\nClient Email: ${email}\n\nClient Message:\n${message}`,
      },
      {
        from: "DevInfotech <onboarding@devinfotech.net>",
        to: [email], // Email to the filler
        subject: `Confirmation: We received your inquiry`,
        text: `Hi ${name},\n\nThank you for contacting DevInfotech. This is an automated confirmation that we have received your message. Our team will review it and get back to you shortly.\n\nYour message details:\nSubject: ${subject || "No Subject"}\nMessage:\n${message}\n\nBest Regards,\nDevInfotech Team`,
      }
    ]);

    if (error) {
      console.error("Resend API Error:", error);
      // Resend free tier restricts sending to unverified external emails.
      // Since the database insert already succeeded, we still return success to the user.
      console.warn("Note: Email dispatch failed, but inquiry was saved to the database.");
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("Contact Form Critical Error:", err);
    return { error: err instanceof Error ? err.message : "Unknown communication failure." };
  }
}
