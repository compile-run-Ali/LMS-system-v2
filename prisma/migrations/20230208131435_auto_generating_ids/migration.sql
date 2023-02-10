-- CreateTable
CREATE TABLE `Student` (
    `p_number` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone_number` BIGINT NOT NULL,
    `cgpa` DOUBLE NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `DOB` DATETIME(3) NOT NULL,
    `profile_picture` VARCHAR(191) NULL,

    PRIMARY KEY (`p_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SRC` (
    `src_id` VARCHAR(191) NOT NULL,
    `p_number` INTEGER NOT NULL,
    `course_code` INTEGER NOT NULL,

    PRIMARY KEY (`src_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `course_code` INTEGER NOT NULL,
    `course_name` VARCHAR(191) NOT NULL,
    `credit_hours` INTEGER NOT NULL,
    `department` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Course_course_code_key`(`course_code`),
    PRIMARY KEY (`course_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faculty` (
    `faculty_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `phone_number` INTEGER NOT NULL,
    `profile_picture` VARCHAR(191) NULL,

    PRIMARY KEY (`faculty_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FTC` (
    `ftc_id` VARCHAR(191) NOT NULL,
    `faculty_id` VARCHAR(191) NOT NULL,
    `course_code` INTEGER NOT NULL,

    PRIMARY KEY (`ftc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaperApproval` (
    `paperapproval_id` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `approved` BOOLEAN NOT NULL,
    `paper_id` VARCHAR(191) NOT NULL,
    `faculty_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PaperApproval_paper_id_key`(`paper_id`),
    UNIQUE INDEX `PaperApproval_faculty_id_key`(`faculty_id`),
    PRIMARY KEY (`paperapproval_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paper` (
    `paper_id` VARCHAR(191) NOT NULL,
    `course_code` INTEGER NOT NULL,
    `time` TIME NOT NULL,
    `date` DATE NOT NULL,
    `weightage` INTEGER NOT NULL,

    PRIMARY KEY (`paper_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubjectiveQuestion` (
    `sq_id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `long_question` BOOLEAN NOT NULL,
    `marks` INTEGER NOT NULL,
    `paper_id` VARCHAR(191) NOT NULL,
    `parent_sq_id` VARCHAR(191) NULL,

    PRIMARY KEY (`sq_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SSA` (
    `soa_id` VARCHAR(191) NOT NULL,
    `sq_id` VARCHAR(191) NOT NULL,
    `p_number` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`soa_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ObjectiveQuestion` (
    `oq_id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `answers` VARCHAR(191) NOT NULL,
    `correct_answer` VARCHAR(191) NOT NULL,
    `marks` INTEGER NOT NULL,
    `paper_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`oq_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SOA` (
    `soa_id` VARCHAR(191) NOT NULL,
    `oq_id` VARCHAR(191) NOT NULL,
    `p_number` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`soa_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SRC` ADD CONSTRAINT `SRC_p_number_fkey` FOREIGN KEY (`p_number`) REFERENCES `Student`(`p_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SRC` ADD CONSTRAINT `SRC_course_code_fkey` FOREIGN KEY (`course_code`) REFERENCES `Course`(`course_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FTC` ADD CONSTRAINT `FTC_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `Faculty`(`faculty_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FTC` ADD CONSTRAINT `FTC_course_code_fkey` FOREIGN KEY (`course_code`) REFERENCES `Course`(`course_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaperApproval` ADD CONSTRAINT `PaperApproval_paper_id_fkey` FOREIGN KEY (`paper_id`) REFERENCES `Paper`(`paper_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaperApproval` ADD CONSTRAINT `PaperApproval_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `Faculty`(`faculty_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paper` ADD CONSTRAINT `Paper_course_code_fkey` FOREIGN KEY (`course_code`) REFERENCES `Course`(`course_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectiveQuestion` ADD CONSTRAINT `SubjectiveQuestion_paper_id_fkey` FOREIGN KEY (`paper_id`) REFERENCES `Paper`(`paper_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectiveQuestion` ADD CONSTRAINT `SubjectiveQuestion_parent_sq_id_fkey` FOREIGN KEY (`parent_sq_id`) REFERENCES `SubjectiveQuestion`(`sq_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SSA` ADD CONSTRAINT `SSA_sq_id_fkey` FOREIGN KEY (`sq_id`) REFERENCES `SubjectiveQuestion`(`sq_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SSA` ADD CONSTRAINT `SSA_p_number_fkey` FOREIGN KEY (`p_number`) REFERENCES `Student`(`p_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObjectiveQuestion` ADD CONSTRAINT `ObjectiveQuestion_paper_id_fkey` FOREIGN KEY (`paper_id`) REFERENCES `Paper`(`paper_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SOA` ADD CONSTRAINT `SOA_oq_id_fkey` FOREIGN KEY (`oq_id`) REFERENCES `ObjectiveQuestion`(`oq_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SOA` ADD CONSTRAINT `SOA_p_number_fkey` FOREIGN KEY (`p_number`) REFERENCES `Student`(`p_number`) ON DELETE RESTRICT ON UPDATE CASCADE;
