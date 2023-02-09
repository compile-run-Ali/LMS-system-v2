-- DropForeignKey
ALTER TABLE `paper` DROP FOREIGN KEY `Paper_course_code_fkey`;

-- AlterTable
ALTER TABLE `paper` MODIFY `course_code` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Paper` ADD CONSTRAINT `Paper_course_code_fkey` FOREIGN KEY (`course_code`) REFERENCES `Course`(`course_code`) ON DELETE SET NULL ON UPDATE CASCADE;
