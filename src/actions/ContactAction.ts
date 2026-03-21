"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "fallback_key_for_build");

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Missing required fields" };
  }

  // Ensure Resend isn't disabled or unconfigured
  if (!process.env.RESEND_API_KEY) {
    console.warn("Resend API Key not found, mocking email submission.");
    // Simulate real network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, message: "Message mocked due to missing API key." };
  }

  try {
    const { error } = await resend.emails.send({
      from: "DevInfotech Leads <onboarding@resend.dev>",
      to: ["info@devinfotech.net"], // Target delivery email
      subject: `New Lead: ${subject || "General Inquiry"} - ${name}`,
      text: `Client Name: ${name}\nClient Email: ${email}\n\nClient Message:\n${message}`,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { error: "Failed to dispatch email across the network." };
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("Contact Form Critical Error:", err);
    return { error: err instanceof Error ? err.message : "Unknown communication failure." };
  }
}
