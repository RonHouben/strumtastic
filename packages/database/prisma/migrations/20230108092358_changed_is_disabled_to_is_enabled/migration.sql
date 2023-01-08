/*
  Warnings:

  - You are about to drop the column `isDisabled` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "isDisabled",
ADD COLUMN     "isEnabled" BOOLEAN NOT NULL DEFAULT false;
