const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const HOST = process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, priceId, bookingInputId } = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      mode: "payment",
      success_url: `${HOST}/create-booking?bookingInputId=${bookingInputId}`,
      cancel_url: `${HOST}`,
    });
    res.status(200).json({ url: session.url });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
