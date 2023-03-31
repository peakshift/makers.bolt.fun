/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `FoundersClubInvitation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FoundersClubInvitation_code_key" ON "FoundersClubInvitation"("code");
