/*
  Warnings:

  - The primary key for the `PostComment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PostComment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `parent_comment_id` column on the `PostComment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_parent_comment_id_fkey";

-- AlterTable
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_pkey",
ADD COLUMN     "nostr_id" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "parent_comment_id",
ADD COLUMN     "parent_comment_id" INTEGER,
ADD CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "PostComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
