-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nostr_prv_key" TEXT,
ADD COLUMN     "nostr_pub_key" TEXT;
