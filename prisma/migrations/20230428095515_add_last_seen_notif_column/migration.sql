-- AlterTable
ALTER TABLE "User" ADD COLUMN     "last_seen_notification_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
