-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "config" JSONB,
ADD COLUMN     "contacts" JSONB,
ADD COLUMN     "makers_deals" JSONB,
ADD COLUMN     "partners" JSONB,
ADD COLUMN     "schedule" JSONB;
