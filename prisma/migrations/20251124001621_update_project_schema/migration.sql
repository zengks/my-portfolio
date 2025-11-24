/*
  Warnings:

  - Added the required column `projectYear` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectYear" INTEGER NOT NULL;
