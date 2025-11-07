/*
  Warnings:

  - You are about to drop the column `bio` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Profile" DROP COLUMN "bio",
ADD COLUMN     "bioLink" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "linkedInUrl" TEXT,
ADD COLUMN     "province" TEXT;
