import emailjs from "emailjs-com";

interface EmailFormData {
  [key: string]: string | number | boolean; // Adjust this to match the actual structure of formData
}

export async function sendEmail(formData: EmailFormData): Promise<boolean> {
  try {
    if (
      !process.env.NEXT_PUBLIC_EMAIL_KEY ||
      !process.env.NEXT_PUBLIC_EMAIL_TEMPLATE ||
      !process.env.NEXT_PUBLIC_USER_PUBLIC_ID
    ) {
      console.error("Missing EmailJS environment variables");
      return false;
    }

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_KEY,
      process.env.NEXT_PUBLIC_EMAIL_TEMPLATE,
      formData,
      process.env.NEXT_PUBLIC_USER_PUBLIC_ID
    );

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

