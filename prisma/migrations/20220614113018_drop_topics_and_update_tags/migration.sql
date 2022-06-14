/*
  Warnings:

  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HackathonToTopic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "_HackathonToTopic" DROP CONSTRAINT "_HackathonToTopic_A_fkey";

-- DropForeignKey
ALTER TABLE "_HackathonToTopic" DROP CONSTRAINT "_HackathonToTopic_B_fkey";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "icon" TEXT,
ADD COLUMN     "isOfficial" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Topic";

-- DropTable
DROP TABLE "_HackathonToTopic";

-- CreateTable
CREATE TABLE "_HackathonToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HackathonToTag_AB_unique" ON "_HackathonToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_HackathonToTag_B_index" ON "_HackathonToTag"("B");

-- AddForeignKey
ALTER TABLE "_HackathonToTag" ADD FOREIGN KEY ("A") REFERENCES "Hackathon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HackathonToTag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
