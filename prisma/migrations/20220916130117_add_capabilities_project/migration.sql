-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "discord" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "github" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "hashtag" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "launch_status" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "tagline" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "twitter" TEXT NOT NULL DEFAULT E'';

-- CreateTable
CREATE TABLE "Capability" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT,
    "is_official" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Capability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CapabilityToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Capability_title_key" ON "Capability"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_CapabilityToProject_AB_unique" ON "_CapabilityToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_CapabilityToProject_B_index" ON "_CapabilityToProject"("B");

-- AddForeignKey
ALTER TABLE "_CapabilityToProject" ADD FOREIGN KEY ("A") REFERENCES "Capability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CapabilityToProject" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
