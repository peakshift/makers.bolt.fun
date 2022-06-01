/*
  Warnings:

  - A unique constraint covering the columns `[pubKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT,
ADD COLUMN     "pubKey" TEXT,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "GeneratedK1" (
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeneratedK1_pkey" PRIMARY KEY ("value")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_pubKey_key" ON "User"("pubKey");
