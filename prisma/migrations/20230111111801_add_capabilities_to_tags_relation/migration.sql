-- CreateTable
CREATE TABLE "_CapabilityToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CapabilityToTag_AB_unique" ON "_CapabilityToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_CapabilityToTag_B_index" ON "_CapabilityToTag"("B");

-- AddForeignKey
ALTER TABLE "_CapabilityToTag" ADD CONSTRAINT "_CapabilityToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Capability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CapabilityToTag" ADD CONSTRAINT "_CapabilityToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
