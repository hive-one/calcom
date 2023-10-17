/*
  Warnings:

  - You are about to drop the column `stripePayload` on the `SuccesfulPayments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SuccesfulPayments" DROP COLUMN "stripePayload";
