"use server";

import { Resend } from "resend";

export interface ContactResult {
  success: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactEmail(formData: FormData): Promise<ContactResult> {
  const honeypot = formData.get("website") as string;
  if (honeypot) return { success: true };

  const name    = (formData.get("name")    as string | null)?.trim() ?? "";
  const email   = (formData.get("email")   as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  if (!EMAIL_RE.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (message.length > 5000) {
    return { success: false, error: "Message must be under 5000 characters." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from:    process.env.CONTACT_FROM_EMAIL!,
      to:      process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Failed to send your message. Please try again later." };
  }
}
