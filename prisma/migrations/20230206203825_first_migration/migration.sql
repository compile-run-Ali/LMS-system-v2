-- CreateTable
CREATE TABLE `Student` (
    `P_number` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone_number` BIGINT NOT NULL,
    `CGPA` DOUBLE NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `DOB` DATETIME(3) NOT NULL,
    `profile_picture` VARCHAR(191) NULL,

    PRIMARY KEY (`P_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SRC` (
    `SRC_ID` INTEGER NOT NULL,
    `P_number` INTEGER NOT NULL,
    `CourseId` INTEGER NOT NULL,

    PRIMARY KEY (`SRC_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `Course_Code` INTEGER NOT NULL,
    `Course_name` VARCHAR(191) NOT NULL,
    `Credit_hours` INTEGER NOT NULL,
    `Department` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Course_Code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faculty` (
    `Faculty_ID` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `Phone_number` INTEGER NOT NULL,
    `profile_picture` VARCHAR(191) NULL,

    PRIMARY KEY (`Faculty_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FTC` (
    `FTC_ID` INTEGER NOT NULL,
    `Faculty_ID` INTEGER NOT NULL,
    `Course_Code` INTEGER NOT NULL,

    PRIMARY KEY (`FTC_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaperApproval` (
    `PaperApprovalId` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,
    `approved` BOOLEAN NOT NULL,
    `Paper_ID` INTEGER NOT NULL,
    `Faculty_ID` INTEGER NOT NULL,

    UNIQUE INDEX `PaperApproval_Paper_ID_key`(`Paper_ID`),
    UNIQUE INDEX `PaperApproval_Faculty_ID_key`(`Faculty_ID`),
    PRIMARY KEY (`PaperApprovalId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paper` (
    `PaperID` INTEGER NOT NULL,
    `Course_Code` INTEGER NOT NULL,
    `Time` TIME NOT NULL,
    `Date` DATE NOT NULL,

    UNIQUE INDEX `Paper_Course_Code_key`(`Course_Code`),
    PRIMARY KEY (`PaperID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubjectiveQuestion` (
    `SQ_ID` INTEGER NOT NULL,
    `Question` VARCHAR(191) NOT NULL,
    `Long_Question` BOOLEAN NOT NULL,
    `Marks` INTEGER NOT NULL,
    `PaperID` INTEGER NOT NULL,
    `Parent_SQ_ID` INTEGER NULL,

    PRIMARY KEY (`SQ_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SSA` (
    `SOA_ID` INTEGER NOT NULL,
    `SQ_ID` INTEGER NOT NULL,
    `P_Number` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`SOA_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ObjectiveQuestion` (
    `OQ_ID` INTEGER NOT NULL,
    `Question` VARCHAR(191) NOT NULL,
    `Answers` VARCHAR(191) NOT NULL,
    `Marks` INTEGER NOT NULL,
    `PaperID` INTEGER NOT NULL,

    PRIMARY KEY (`OQ_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SOA` (
    `SOA_ID` INTEGER NOT NULL,
    `OQ_ID` INTEGER NOT NULL,
    `P_Number` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`SOA_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SRC` ADD CONSTRAINT `SRC_P_number_fkey` FOREIGN KEY (`P_number`) REFERENCES `Student`(`P_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SRC` ADD CONSTRAINT `SRC_CourseId_fkey` FOREIGN KEY (`CourseId`) REFERENCES `Course`(`Course_Code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FTC` ADD CONSTRAINT `FTC_Faculty_ID_fkey` FOREIGN KEY (`Faculty_ID`) REFERENCES `Faculty`(`Faculty_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FTC` ADD CONSTRAINT `FTC_Course_Code_fkey` FOREIGN KEY (`Course_Code`) REFERENCES `Course`(`Course_Code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaperApproval` ADD CONSTRAINT `PaperApproval_Paper_ID_fkey` FOREIGN KEY (`Paper_ID`) REFERENCES `Paper`(`PaperID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaperApproval` ADD CONSTRAINT `PaperApproval_Faculty_ID_fkey` FOREIGN KEY (`Faculty_ID`) REFERENCES `Faculty`(`Faculty_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paper` ADD CONSTRAINT `Paper_Course_Code_fkey` FOREIGN KEY (`Course_Code`) REFERENCES `Course`(`Course_Code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectiveQuestion` ADD CONSTRAINT `SubjectiveQuestion_PaperID_fkey` FOREIGN KEY (`PaperID`) REFERENCES `Paper`(`PaperID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectiveQuestion` ADD CONSTRAINT `SubjectiveQuestion_Parent_SQ_ID_fkey` FOREIGN KEY (`Parent_SQ_ID`) REFERENCES `SubjectiveQuestion`(`SQ_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SSA` ADD CONSTRAINT `SSA_SQ_ID_fkey` FOREIGN KEY (`SQ_ID`) REFERENCES `SubjectiveQuestion`(`SQ_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SSA` ADD CONSTRAINT `SSA_P_Number_fkey` FOREIGN KEY (`P_Number`) REFERENCES `Student`(`P_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ObjectiveQuestion` ADD CONSTRAINT `ObjectiveQuestion_PaperID_fkey` FOREIGN KEY (`PaperID`) REFERENCES `Paper`(`PaperID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SOA` ADD CONSTRAINT `SOA_OQ_ID_fkey` FOREIGN KEY (`OQ_ID`) REFERENCES `ObjectiveQuestion`(`OQ_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SOA` ADD CONSTRAINT `SOA_P_Number_fkey` FOREIGN KEY (`P_Number`) REFERENCES `Student`(`P_number`) ON DELETE RESTRICT ON UPDATE CASCADE;
