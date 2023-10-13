import prisma from "@calcom/prisma";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const HOST = process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, priceId, bookingInputId } = req.body;
    const customerExists = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    let customerId = null;
    if (customerExists) {
      customerId = customerExists.stripeId;
    } else {
      const customer = await stripe.customers.create({
        email,
        name,
      });
      const savedCustomer = await prisma.customer.create({
        data: {
          email,
          name,
          stripeId: customer.id,
          stripeCustomerLink: `https://dashboard.stripe.com/customers/${customer.id}`,
        },
      });
      console.log("New customer created in db");
      customerId = savedCustomer.stripeId;
    }
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          testDat: "test",
        },
      },
      customer: customerId,
      mode: "payment",
      success_url: `${HOST}/create-booking?bookingInputId=${bookingInputId}`,
      cancel_url: `${HOST}`,
    });
    res.status(200).json({ url: session.url });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
