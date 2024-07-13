-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_repository_id_fkey";

-- DropForeignKey
ALTER TABLE "repositories" DROP CONSTRAINT "repositories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tip_reads" DROP CONSTRAINT "tip_reads_tip_id_fkey";

-- DropForeignKey
ALTER TABLE "tips" DROP CONSTRAINT "tips_file_id_fkey";

-- DropForeignKey
ALTER TABLE "tips" DROP CONSTRAINT "tips_user_id_fkey";

-- AddForeignKey
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tips" ADD CONSTRAINT "tips_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tips" ADD CONSTRAINT "tips_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tip_reads" ADD CONSTRAINT "tip_reads_tip_id_fkey" FOREIGN KEY ("tip_id") REFERENCES "tips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
