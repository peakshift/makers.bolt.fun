-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_request" TEXT,
    "payment_hash" TEXT,
    "preimage" TEXT,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "donor_id" INTEGER,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
