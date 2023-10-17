export default async function handler(req, res) {
  console.log(`<=== Stripe webhook running ===>`);
  const { body: event } = req;
  if (event.type === "payment_intent.succeeded") {
    console.log(event.data.object);
  }
  res.status(200).json("ok");
}
