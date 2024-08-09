

-- CreateTable
CREATE TABLE `DataBankQuestion` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(10000) NOT NULL,
    `answers` VARCHAR(1000) NULL,
    `correct_answer` VARCHAR(4000) NOT NULL,
    `marks` DOUBLE NOT NULL,
    `timeAllowed` INTEGER NULL DEFAULT 0,
    `authority` VARCHAR(191) NOT NULL DEFAULT '-',
    `difficulty` VARCHAR(191) NOT NULL,
    `course` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `topic` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DbCourse` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(32) NOT NULL,

    UNIQUE INDEX `DbCourse_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DbSubject` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(32) NOT NULL,
    `course` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DbSubject_name_course_key`(`name`, `course`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DbTopic` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(32) NOT NULL,
    `course` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DbTopic_course_name_key`(`course`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- AddForeignKey
ALTER TABLE `DbSubject` ADD CONSTRAINT `DbSubject_course_fkey` FOREIGN KEY (`course`) REFERENCES `DbCourse`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DbTopic` ADD CONSTRAINT `DbTopic_course_fkey` FOREIGN KEY (`course`) REFERENCES `DbCourse`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
