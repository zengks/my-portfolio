/*
  Warnings:

  - You are about to drop the column `certNumber` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `aboutUser` on the `users` table. All the data in the column will be lost.
  - Added the required column `issuingOrg` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Certificate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateIssued` on table `Certificate` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `startMonth` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startMonth` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "certNumber",
ADD COLUMN     "companyLogoUrl" TEXT,
ADD COLUMN     "credentialId" TEXT,
ADD COLUMN     "credentialUrl" TEXT,
ADD COLUMN     "issuingOrg" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "dateIssued" SET NOT NULL;

-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "endMonth" INTEGER,
ADD COLUMN     "province" TEXT,
ADD COLUMN     "schoolLogoUrl" TEXT,
ADD COLUMN     "startMonth" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "resumeUrl" TEXT;

-- AlterTable
ALTER TABLE "WorkExperience" ADD COLUMN     "city" TEXT,
ADD COLUMN     "companyLogoUrl" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "employmentType" TEXT,
ADD COLUMN     "endMonth" INTEGER,
ADD COLUMN     "locationType" TEXT,
ADD COLUMN     "province" TEXT,
ADD COLUMN     "startMonth" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "aboutUser";

-- CreateTable
CREATE TABLE "AboutUser" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    "header" TEXT NOT NULL,
    "aboutContent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AboutUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryName" TEXT,
    "subCategoryName" TEXT,
    "skills" TEXT[],
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AboutUser_username_idx" ON "AboutUser"("username");

-- CreateIndex
CREATE INDEX "Skill_userId_username_idx" ON "Skill"("userId", "username");

-- AddForeignKey
ALTER TABLE "AboutUser" ADD CONSTRAINT "AboutUser_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_userId_username_fkey" FOREIGN KEY ("userId", "username") REFERENCES "users"("id", "username") ON DELETE CASCADE ON UPDATE CASCADE;
