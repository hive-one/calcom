/*
  Warnings:

  - You are about to drop the `BookingCheckoutSessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookingPayments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_customerId_fkey";

-- DropTable
DROP TABLE "BookingCheckoutSessions";

-- DropTable
DROP TABLE "BookingPayments";

-- CreateTable
CREATE TABLE "SuccesfulPayments" (
    "id" SERIAL NOT NULL,
    "stripeId" TEXT NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "stripePayload" JSONB NOT NULL,

    CONSTRAINT "SuccesfulPayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripePaymentIntent" (
    "id" SERIAL NOT NULL,
    "stripeId" TEXT NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "stripePayload" JSONB NOT NULL,

    CONSTRAINT "StripePaymentIntent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuccesfulPayments" ADD CONSTRAINT "SuccesfulPayments_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripePaymentIntent" ADD CONSTRAINT "StripePaymentIntent_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
