/*
  Warnings:

  - You are about to drop the column `date` on the `TournamentEvent` table. All the data in the column will be lost.
  - Added the required column `ends_at` to the `TournamentEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starts_at` to the `TournamentEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TournamentEvent" DROP COLUMN "date",
ADD COLUMN     "ends_at" DATE NOT NULL,
ADD COLUMN     "starts_at" DATE NOT NULL;
