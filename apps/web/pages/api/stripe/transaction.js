import prisma from "@calcom/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { customerId, bookingId, sessionId } = req.body;
    console.log("I am here");
    const transaction = await prisma.succesfulPayments.create({
      data: {
        stripeCustomerId: customerId,
        bookingId,
        stripeSessionId: sessionId,
      },
    });
    console.log(transaction);
    res.status(200).json({ transaction });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
