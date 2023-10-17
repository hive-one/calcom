/*
  Warnings:

  - You are about to drop the column `stripeId` on the `StripePaymentIntent` table. All the data in the column will be lost.
  - You are about to drop the column `stripeId` on the `SuccesfulPayments` table. All the data in the column will be lost.
  - Added the required column `stripeCustomerId` to the `StripePaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeSessionId` to the `StripePaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeCustomerId` to the `SuccesfulPayments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeSessionId` to the `SuccesfulPayments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StripePaymentIntent" DROP COLUMN "stripeId",
ADD COLUMN     "stripeCustomerId" TEXT NOT NULL,
ADD COLUMN     "stripeSessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SuccesfulPayments" DROP COLUMN "stripeId",
ADD COLUMN     "stripeCustomerId" TEXT NOT NULL,
ADD COLUMN     "stripeSessionId" TEXT NOT NULL;
