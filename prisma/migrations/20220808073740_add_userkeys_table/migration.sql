-- CreateTable
CREATE TABLE "UserKey" (
    "key" TEXT NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "UserKey_pkey" PRIMARY KEY ("key")
);

-- AddForeignKey
ALTER TABLE "UserKey" ADD CONSTRAINT "UserKey_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
