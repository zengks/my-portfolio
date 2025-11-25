/*
  Warnings:

  - You are about to drop the column `username` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,username]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SocialMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_username_fkey";

-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_username_fkey";

-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_username_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_username_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_username_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_username_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_username_fkey";

-- DropForeignKey
ALTER TABLE "SocialMedia" DROP CONSTRAINT "SocialMedia_username_fkey";

-- DropForeignKey
ALTER TABLE "WorkExperience" DROP CONSTRAINT "WorkExperience_username_fkey";

-- DropIndex
DROP INDEX "Account_username_key";

-- DropIndex
DROP INDEX "BlogPost_username_idx";

-- DropIndex
DROP INDEX "BlogPost_username_key";

-- DropIndex
DROP INDEX "Certificate_username_idx";

-- DropIndex
DROP INDEX "Certificate_username_key";

-- DropIndex
DROP INDEX "Education_username_idx";

-- DropIndex
DROP INDEX "Education_username_key";

-- DropIndex
DROP INDEX "Project_username_idx";

-- DropIndex
DROP INDEX "Project_username_key";

-- DropIndex
DROP INDEX "Session_username_key";

-- DropIndex
DROP INDEX "SocialMedia_username_idx";

-- DropIndex
DROP INDEX "SocialMedia_username_key";

-- DropIndex
DROP INDEX "WorkExperience_username_idx";

-- DropIndex
DROP INDEX "WorkExperience_username_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "SocialMedia" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkExperience" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "BlogPost_userId_username_idx" ON "BlogPost"("userId", "username");

-- CreateIndex
CREATE INDEX "Certificate_userId_username_idx" ON "Certificate"("userId", "username");

-- CreateIndex
CREATE INDEX "Education_userId_username_idx" ON "Education"("userId", "username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_username_key" ON "Profile"("userId", "username");

-- CreateIndex
CREATE INDEX "Project_userId_username_idx" ON "Project"("userId", "username");

-- CreateIndex
CREATE INDEX "SocialMedia_userId_username_idx" ON "SocialMedia"("userId", "username");

-- CreateIndex
CREATE INDEX "WorkExperience_userId_username_idx" ON "WorkExperience"("userId", "username");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_username_key" ON "users"("id", "username");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_username_fkey" FOREIGN KEY ("userId", "username") REFERENCES "users"("id", "username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_userId_username_fkey" FOREIGN KEY ("userId", "username") REFERENCES "users"("id", "username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_username_fkey" FOREIGN KEY ("userId", "username") REFERENCES "users"("id", "username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_userId_username_fkey" FOREIGN KEY ("userId", "username") REFERENCES "users"("id", "username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_username_fkey" FOREIGN KEY ("userId", "username") REFERENCES "users"("id", "username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_userId_username_fkey" FOREIGN KEY ("userId", "username") REFERENCES "users"("id", "username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_userId_username_fkey" FOREIGN KEY ("userId", "username") REFERENCES "users"("id", "username") ON DELETE CASCADE ON UPDATE CASCADE;
