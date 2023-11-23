-- AlterTable
ALTER TABLE "Badge" ADD COLUMN     "color" TEXT,
ADD COLUMN     "winningDescriptionTemplate" TEXT;

-- AlterTable
ALTER TABLE "UserBadge" ADD COLUMN     "metaData" JSONB;
