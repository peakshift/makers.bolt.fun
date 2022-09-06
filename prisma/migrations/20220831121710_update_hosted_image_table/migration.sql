/*
  Warnings:

  - The primary key for the `HostedImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `HostedImage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `provider` to the `HostedImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_image_id` to the `HostedImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `HostedImage` table without a default value. This is not possible if the table is not empty.

*/

-- START Custom SQL
-- Because of the breaking changes, we have to apply some custom SQL. 
-- By chance, the previous HostedImage migration is not used it production, so we can remove all data from this table
DELETE FROM "HostedImage";
-- END Custom SQL


-- AlterTable
ALTER TABLE "HostedImage" DROP CONSTRAINT "HostedImage_pkey",
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "provider_image_id" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "HostedImage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserKey" ALTER COLUMN "name" SET DEFAULT E'My new wallet key';
