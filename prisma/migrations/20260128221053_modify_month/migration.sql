/*
  Warnings:

  - The `endMonth` column on the `Education` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endMonth` column on the `WorkExperience` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `startMonth` on the `Education` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startMonth` on the `WorkExperience` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "endMonth",
ADD COLUMN     "endMonth" INTEGER,
DROP COLUMN "startMonth",
ADD COLUMN     "startMonth" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WorkExperience" DROP COLUMN "endMonth",
ADD COLUMN     "endMonth" INTEGER,
DROP COLUMN "startMonth",
ADD COLUMN     "startMonth" INTEGER NOT NULL;
