/*
  Warnings:

  - You are about to drop the column `customerId` on the `BookingCheckoutSessions` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `BookingPayments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookingCheckoutSessions" DROP CONSTRAINT "BookingCheckoutSessions_customerId_fkey";

-- DropForeignKey
ALTER TABLE "BookingPayments" DROP CONSTRAINT "BookingPayments_customerId_fkey";

-- AlterTable
ALTER TABLE "BookingCheckoutSessions" DROP COLUMN "customerId",
ADD COLUMN     "stripeData" JSONB;

-- AlterTable
ALTER TABLE "BookingPayments" DROP COLUMN "customerId",
ADD COLUMN     "stripeData" JSONB;
