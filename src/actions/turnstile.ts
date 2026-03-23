"use server";

export async function verifyTurnstileToken(token: string) {
  if (!token) {
    return { success: false, error: "Token is required" };
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is missing in environment variables.");
    // Fail closed or open? Since this is security, fail closed is usually preferred,
    // but in development we might want to warn. 
    // We will fail closed to be safe.
    return { success: false, error: "Server configuration error" };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      return { success: true };
    } else {
      console.error("Turnstile verification failed:", data["error-codes"]);
      return { success: false, error: "Turnstile verification failed" };
    }
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return { success: false, error: "An error occurred during verification" };
  }
}
