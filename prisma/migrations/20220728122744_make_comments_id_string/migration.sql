/*
  Warnings:

  - The primary key for the `PostComment` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_parent_comment_id_fkey";

-- AlterTable
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "parent_comment_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PostComment_id_seq";

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "PostComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
