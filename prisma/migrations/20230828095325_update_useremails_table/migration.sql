/*
  Warnings:

  - The primary key for the `UserEmail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `UserEmail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `UserEmail` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserEmail" DROP CONSTRAINT "UserEmail_pkey",
DROP COLUMN "name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserEmail_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmail_email_key" ON "UserEmail"("email");
