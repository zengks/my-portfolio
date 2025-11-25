/*
  Warnings:

  - Made the column `title` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "tech_stack" TEXT[],
ALTER COLUMN "title" SET NOT NULL;

-- CreateIndex
CREATE INDEX "BlogPost_authorId_idx" ON "public"."BlogPost"("authorId");

-- CreateIndex
CREATE INDEX "Certificate_userId_idx" ON "public"."Certificate"("userId");

-- CreateIndex
CREATE INDEX "Education_userId_idx" ON "public"."Education"("userId");

-- CreateIndex
CREATE INDEX "Profile_userId_idx" ON "public"."Profile"("userId");

-- CreateIndex
CREATE INDEX "Project_userId_idx" ON "public"."Project"("userId");

-- CreateIndex
CREATE INDEX "SocialMedia_userId_idx" ON "public"."SocialMedia"("userId");

-- CreateIndex
CREATE INDEX "WorkExperience_userId_idx" ON "public"."WorkExperience"("userId");
