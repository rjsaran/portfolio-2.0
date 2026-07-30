import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// No custom domain is verified in Resend for this project, so this sends
// from Resend's shared sandbox address. That's only deliverable to the
// Resend account's own verified email — which is fine here, since this form
// always sends to EMAIL_ADDRESS (the account owner). If a custom domain is
// verified later, set FROM_EMAIL and this picks it up with no code change.
const FROM_ADDRESS = process.env.FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

// HTML email template
const generateEmailTemplate = (name: string, email: string, userMessage: string) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

async function sendEmail(payload: { name: string; email: string; message: string }, message: string) {
  const { name, email, message: userMessage } = payload;

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: process.env.EMAIL_ADDRESS as string,
    subject: `New Message From ${name}`,
    text: message,
    html: generateEmailTemplate(name, email, userMessage),
    replyTo: email,
  });

  if (error) {
    console.error("Error while sending email:", error);
    return false;
  }

  return true;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const payload = await req.body;
    const { name, email, message: userMessage } = payload;

    const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    const emailSuccess = await sendEmail(payload, message);

    if (emailSuccess) {
      return res.json({
        success: true,
        message: "Message and email sent successfully!",
      });
    }

    return res.json({
      success: false,
      message: "Failed to send message or email.",
    });
  } catch (error) {
    console.error("API Error:", (error as Error).message);

    return res.json({
      success: false,
      message: "Server error occurred.",
    });
  }
};
