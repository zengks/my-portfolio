/*
  Warnings:

  - You are about to drop the column `startDate` on the `Education` table. All the data in the column will be lost.
  - The `endDate` column on the `Education` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `startYear` to the `Education` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "startDate",
ADD COLUMN     "startYear" INTEGER NOT NULL,
DROP COLUMN "endDate",
ADD COLUMN     "endDate" INTEGER;
