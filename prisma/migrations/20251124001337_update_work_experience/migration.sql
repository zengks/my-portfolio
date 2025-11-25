/*
  Warnings:

  - You are about to drop the column `endDate` on the `WorkExperience` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `WorkExperience` table. All the data in the column will be lost.
  - Added the required column `startYear` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkExperience" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endYear" INTEGER,
ADD COLUMN     "startYear" INTEGER NOT NULL;
