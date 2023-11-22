-- AlterTable
ALTER TABLE "UserNostrKey" ADD COLUMN     "is_default_generated_key" BOOLEAN NOT NULL DEFAULT false;
