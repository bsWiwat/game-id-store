import emailjs from "emailjs-com";

// Define the OrderData type
interface OrderData {
  order_id: string;
  email: string;
  orders: {
    usernameId: string;
    passwordId: string;
    image_url: string;
    units: number;
    price: number;
  }[];
  cost: {
    discount: number;
    total: number;
  };
}

export async function sendOrderEmail(orderData: OrderData) {

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_KEY!,
      "template_39njfe7",
      {
        order_id: orderData.order_id,
        email: orderData.email,
        orders: JSON.stringify(orderData.orders),
        discount: orderData.cost.discount,
        total: orderData.cost.total,
      },
      process.env.NEXT_PUBLIC_USER_PUBLIC_ID!
    );
    console.log("Order confirmation email sent successfully!");
  } catch (error) {
    console.error("Failed to send order email:", error);
  }
}




