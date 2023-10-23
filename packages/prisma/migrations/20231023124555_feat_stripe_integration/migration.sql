-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "customerId" INTEGER;

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stripeId" TEXT,
    "stripeCustomerLink" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuccesfulPayments" (
    "id" SERIAL NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "bookingId" INTEGER NOT NULL,

    CONSTRAINT "SuccesfulPayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripePaymentIntent" (
    "id" SERIAL NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "stripePayload" JSONB NOT NULL,

    CONSTRAINT "StripePaymentIntent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuccesfulPayments" ADD CONSTRAINT "SuccesfulPayments_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripePaymentIntent" ADD CONSTRAINT "StripePaymentIntent_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
