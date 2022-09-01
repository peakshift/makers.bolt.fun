/*
  Warnings:

  - Added the required column `level` to the `UsersOnWorkRoles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsersOnWorkRoles" ADD COLUMN     "level" TEXT NOT NULL;
