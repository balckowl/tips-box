/*
  Warnings:

  - You are about to drop the column `user_id` on the `tips` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tips" DROP CONSTRAINT "tips_user_id_fkey";

-- AlterTable
ALTER TABLE "tips" DROP COLUMN "user_id";

-- CreateIndex
CREATE INDEX "files_repository_id_idx" ON "files"("repository_id");

-- CreateIndex
CREATE INDEX "repositories_user_id_idx" ON "repositories"("user_id");

-- CreateIndex
CREATE INDEX "tip_reads_tip_id_idx" ON "tip_reads"("tip_id");

-- CreateIndex
CREATE INDEX "tips_file_id_idx" ON "tips"("file_id");
