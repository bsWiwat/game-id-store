import emailjs from "emailjs-com";

export async function sendOrderEmail(orderData: any) {

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_KEY!,
      "template_39njfe7",
      orderData,
      process.env.NEXT_PUBLIC_USER_PUBLIC_ID!
    );
    console.log("Order confirmation email sent successfully!");
  } catch (error) {
    console.error("Failed to send order email:", error);
  }
}



