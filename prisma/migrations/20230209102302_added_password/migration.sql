/*
  Warnings:

  - Added the required column `password` to the `Faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Paper` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `faculty` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `paper` ADD COLUMN `duration` INTEGER NOT NULL,
    MODIFY `time` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `password` VARCHAR(191) NOT NULL;
