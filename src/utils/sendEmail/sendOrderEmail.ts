import emailjs from "emailjs-com";

interface OrderData {
  orderId: string;
  customerName: string;
  email: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
}

export async function sendOrderEmail(orderData: OrderData) {

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_KEY!,
      "template_39njfe7",
      {
        orderId: orderData.orderId,
        customerName: orderData.customerName,
        email: orderData.email,
        items: JSON.stringify(orderData.items),
        totalAmount: orderData.totalAmount,
      },
      process.env.NEXT_PUBLIC_USER_PUBLIC_ID!
    );
    console.log("Order confirmation email sent successfully!");
  } catch (error) {
    console.error("Failed to send order email:", error);
  }
}



