-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 26, 2024 at 06:26 AM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `acs_lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `Course`
--

CREATE TABLE `Course` (
  `course_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `credit_hours` int(11) NOT NULL,
  `max_students` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Course`
--

INSERT INTO `Course` (`course_code`, `course_name`, `credit_hours`, `max_students`) VALUES
('MCC', 'MCC', 0, 50);

-- --------------------------------------------------------

--
-- Table structure for table `CoursePaper`
--

CREATE TABLE `CoursePaper` (
  `id` int(11) NOT NULL,
  `course_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paper_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `CoursePaper`
--

INSERT INTO `CoursePaper` (`id`, `course_code`, `paper_id`) VALUES
(1, 'MCC', '40196212-be69-42b8-b79e-04e4cdc10523'),
(2, 'MCC', '40196212-be69-42b8-b79e-04e4cdc10523'),
(3, 'MCC', '0c6c7305-eb75-4690-a7e6-ff78c6789a48'),
(4, 'MCC', '0c6c7305-eb75-4690-a7e6-ff78c6789a48'),
(5, 'MCC', '707f9e30-84c2-4fa8-ac6f-2673f736302d'),
(6, 'MCC', '707f9e30-84c2-4fa8-ac6f-2673f736302d'),
(7, 'MCC', '3d2c015a-e50b-442b-ac32-8db077e38373'),
(8, 'MCC', '96a0c94c-e34c-4824-9c4a-76a277ecada3'),
(9, 'MCC', '71093e89-d4b5-49de-93c7-ce76dc380419'),
(10, 'MCC', 'ee75c355-3f77-4e5e-b2f8-f2786c2dbbb9'),
(11, 'MCC', '15e0b303-e46a-4705-84d7-08b3bbadca58'),
(12, 'MCC', '2287ad2a-2f53-46c9-b217-407bff801730'),
(13, 'MCC', '2287ad2a-2f53-46c9-b217-407bff801730'),
(14, 'MCC', '6f3a28b3-cede-40a7-b7ef-a7e875b56108'),
(15, 'MCC', '6f3a28b3-cede-40a7-b7ef-a7e875b56108');

-- --------------------------------------------------------

--
-- Table structure for table `DataBankQuestion`
--

CREATE TABLE `DataBankQuestion` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question` varchar(10000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answers` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `correct_answer` varchar(4000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `marks` double NOT NULL,
  `timeAllowed` int(11) DEFAULT '0',
  `authority` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `difficulty` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `topic` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `DataBankQuestion`
--

INSERT INTO `DataBankQuestion` (`id`, `question`, `answers`, `correct_answer`, `marks`, `timeAllowed`, `authority`, `difficulty`, `course`, `subject`, `topic`, `type`) VALUES
('159b69e6-2e9f-48ce-a5ae-3ec4486b98a7', '12', 'a,b,c,d', 'a', 1, 60, 'a1', 'Easy', 'MCc', 'testSubj', 'testTopic2', 'objective'),
('2a4c9a28-70a3-4f7f-b1e6-2e3001861d3d', 'abcd', NULL, 'abcd', 1, 0, '-', 'Easy', 'MCc', 'testSubj', 'testTopic2', 'subjective'),
('2ed27ebe-acf6-45c9-8e3d-01bf2c11d042', 'abcdaaa', NULL, 'abcd', 1, 0, '-', 'Medium', 'MCc', 'testSubj2', 'topic', 'subjective'),
('38d05ce6-d18e-4f5d-9bdc-e2a440d3ba32', 'abcde', NULL, 'abcde', 1, 0, '-', 'Easy', 'MCc', 'testSubj', 'testTopic2', 'subjective'),
('7c8749f0-c394-4e3d-9db3-c4e4211c2b70', 'abcdddd', 'abac,ccc,ddd,sss', 'abac', 1, 60, '-', 'Hard', 'MCc', 'testSubj2', 'topic', 'objective'),
('b3ffbc91-af34-46f2-858f-6a7868f07e15', 'abcd', 'b,c,d,a', 'b', 1, 60, 'a1', 'Easy', 'MCc', 'testSubj', 'testTopic2', 'objective'),
('d5c7d107-2eeb-466d-8ef5-cafb17d38a64', 'abcd', 'a,b,c,d', 'a', 1, 60, 'a1', 'Easy', 'MCc', 'testSubj', 'testTopic2', 'objective'),
('fe362152-47fb-4f19-84de-5652065907f5', 'q2', NULL, 'q2', 1, 0, '-', 'Easy', 'MCc', 'testSubj', 'testTopic2', 'subjective');

-- --------------------------------------------------------

--
-- Table structure for table `DbCourse`
--

CREATE TABLE `DbCourse` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `DbCourse`
--

INSERT INTO `DbCourse` (`id`, `name`) VALUES
('e22f8064-0623-449d-a2f5-9e251d2da6fe', 'MCc');

-- --------------------------------------------------------

--
-- Table structure for table `DbSubject`
--

CREATE TABLE `DbSubject` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `DbSubject`
--

INSERT INTO `DbSubject` (`id`, `name`, `course`) VALUES
('a4641fa2-66fa-4bd4-bab6-163184bf4ad3', 'testSubj', 'MCc'),
('9def4c4d-b520-47a7-99b7-f1876241b6d8', 'testSubj2', 'MCc');

-- --------------------------------------------------------

--
-- Table structure for table `DbTopic`
--

CREATE TABLE `DbTopic` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `DbTopic`
--

INSERT INTO `DbTopic` (`id`, `name`, `course`, `subject`) VALUES
('40bcd882-e41c-4572-a76e-860a2444569e', 'topic', 'MCc', 'testSubj2'),
('923f7832-7d73-4261-938a-b930fcde1f05', 'testTopic', 'MCc', 'testSubj'),
('e23c8a8f-4d9a-4a91-b54d-1141b55937cd', 'testTopic2', 'MCc', 'testSubj');

-- --------------------------------------------------------

--
-- Table structure for table `Faculty`
--

CREATE TABLE `Faculty` (
  `faculty_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pa_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int(11) NOT NULL,
  `position` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rank` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_picture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Faculty`
--

INSERT INTO `Faculty` (`faculty_id`, `pa_number`, `name`, `password`, `level`, `position`, `rank`, `email`, `phone_number`, `profile_picture`) VALUES
('0', '0', 'admin', '$2b$10$os0s.L4xHxR/ztYfjPEqqORu3TyNHc7BIQDpV/PCP.B/avFgt3TpK', 5, NULL, NULL, 'admin@email.com', '', NULL),
('f256f770-af47-4956-b6e5-8af073c3e264', '00', 'Ali', '$2b$10$1gg6kQjO7arm/yXiNkZjYebhAnOLC6bu96AvUfbRvykn5nM748N/2', 1, 'Instructor', 'Major', 'ali@email.com', '0333', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `FTC`
--

CREATE TABLE `FTC` (
  `ftc_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `faculty_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `FTC`
--

INSERT INTO `FTC` (`ftc_id`, `faculty_id`, `course_code`) VALUES
('d0fec906-5865-4111-9ed6-b1b9eceaf1c9', 'f256f770-af47-4956-b6e5-8af073c3e264', 'MCC');

-- --------------------------------------------------------

--
-- Table structure for table `IeQuestion`
--

CREATE TABLE `IeQuestion` (
  `ie_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileNameWord` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fileUrlWord` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_marks` double NOT NULL DEFAULT '0',
  `paper_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Ip`
--

CREATE TABLE `Ip` (
  `ip_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rank` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Ip`
--

INSERT INTO `Ip` (`ip_address`, `rank`, `role`) VALUES
('192.168.100.125', NULL, 'Faculty');

-- --------------------------------------------------------

--
-- Table structure for table `LinkedPaper`
--

CREATE TABLE `LinkedPaper` (
  `paperIdA` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paperIdB` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Notification`
--

CREATE TABLE `Notification` (
  `notification_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notification` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exam_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `faculty_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ObjectiveQuestion`
--

CREATE TABLE `ObjectiveQuestion` (
  `oq_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question` varchar(10000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answers` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correct_answer` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `difficulty` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `topic` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `authority` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `marks` double NOT NULL,
  `timeAllowed` int(11) NOT NULL DEFAULT '0',
  `paper_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ObjectiveQuestion`
--

INSERT INTO `ObjectiveQuestion` (`oq_id`, `question`, `answers`, `correct_answer`, `difficulty`, `topic`, `authority`, `marks`, `timeAllowed`, `paper_id`, `course`, `subject`) VALUES
('01d56bb2-95ba-4973-ac23-b104ecbb586a', 'abcd', 'b,c,d,a', 'b', 'Easy', 'testTopic2', 'a1', 1, 60, '6f3a28b3-cede-40a7-b7ef-a7e875b56108', 'MCc', 'testSubj'),
('a2f9fbe5-6221-478f-b069-60b21bb4ac1d', 'abcd', 'a,b,c,d', 'a', 'Easy', 'testTopic2', 'a1', 1, 60, '2287ad2a-2f53-46c9-b217-407bff801730', 'MCc', 'testSubj'),
('aac43166-53bb-42e7-81d6-6482ecaf2ab1', 'abcd', 'a,b,c,d', 'a', 'Easy', 'testTopic2', 'a1', 1, 60, '6f3a28b3-cede-40a7-b7ef-a7e875b56108', 'MCc', 'testSubj'),
('b5405f6d-ba12-49a2-b508-2425f6d31d41', '12', 'a,b,c,d', 'a', 'Easy', 'testTopic2', 'a1', 1, 60, '2287ad2a-2f53-46c9-b217-407bff801730', 'MCc', 'testSubj'),
('eaf54123-96ab-4bc3-b4fc-09d4b2bf8f20', '12', 'a,b,c,d', 'a', 'Easy', 'testTopic2', 'a1', 1, 60, '6f3a28b3-cede-40a7-b7ef-a7e875b56108', 'MCc', 'testSubj'),
('fd760aae-ad22-4a8a-af54-3d976e92f723', 'abcd', 'b,c,d,a', 'b', 'Easy', 'testTopic2', 'a1', 1, 60, '2287ad2a-2f53-46c9-b217-407bff801730', 'MCc', 'testSubj');

-- --------------------------------------------------------

--
-- Table structure for table `Paper`
--

CREATE TABLE `Paper` (
  `paper_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paper_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paper_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `freeflow` tinyint(1) DEFAULT NULL,
  `review` tinyint(1) NOT NULL DEFAULT '0',
  `date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int(11) NOT NULL,
  `objDuration` int(11) DEFAULT NULL,
  `weightage` int(11) DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Draft',
  `total_marks` double NOT NULL DEFAULT '0',
  `objective_marks` double NOT NULL DEFAULT '0',
  `subjective_marks` double NOT NULL DEFAULT '0',
  `language` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'English'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Paper`
--

INSERT INTO `Paper` (`paper_id`, `paper_name`, `course_code`, `paper_type`, `freeflow`, `review`, `date`, `duration`, `objDuration`, `weightage`, `status`, `total_marks`, `objective_marks`, `subjective_marks`, `language`) VALUES
('0c6c7305-eb75-4690-a7e6-ff78c6789a48', 'p2', 'MCC', 'Objective', 1, 1, '2024-07-26T09:00Z', 180, 180, NULL, 'Draft', 0, 0, 0, 'English'),
('15e0b303-e46a-4705-84d7-08b3bbadca58', 'clg', 'MCC', 'Subjective/Objective', 1, 1, '1970-01-01T09:00Z', 180, 180, NULL, 'Draft', 0, 0, 0, 'English'),
('2287ad2a-2f53-46c9-b217-407bff801730', 'abcdef', 'MCC', 'Subjective/Objective', 1, 1, '1970-01-01T09:00Z', 180, 180, NULL, 'Draft', 0, 0, 0, 'English'),
('3d2c015a-e50b-442b-ac32-8db077e38373', 'test2', 'MCC', 'Subjective/Objective', 1, 1, '2024-07-26T09:00Z', 180, 180, NULL, 'Draft', 0, 0, 0, 'English'),
('40196212-be69-42b8-b79e-04e4cdc10523', 'p1', 'MCC', 'Subjective/Objective', 1, 1, '2024-07-26T09:00Z', 180, 180, NULL, 'Draft', 0, 0, 0, 'English'),
('6f3a28b3-cede-40a7-b7ef-a7e875b56108', 'papertest', 'MCC', 'Subjective/Objective', 1, 1, '2024-07-26T09:00Z', 180, 180, NULL, 'Draft', 7, 3, 4, 'English'),
('707f9e30-84c2-4fa8-ac6f-2673f736302d', 'test1', 'MCC', 'Subjective/Objective', 1, 1, '2024-07-26T09:00Z', 180, 180, NULL, 'Draft', 0, 0, 0, 'English'),
('71093e89-d4b5-49de-93c7-ce76dc380419', 'test3', 'MCC', 'Subjective/Objective', 1, 1, '2024-07-26T09:00Z', 180, 180, NULL, 'Draft', 0, 0, 0, 'English'),
('96a0c94c-e34c-4824-9c4a-76a277ecada3', 'abcd', 'MCC', 'Subjective/Objective', 1, 1, '2024-07-26T09:00Z', 180, 180, NULL, 'Draft', 0, 0, 0, 'English'),
('ee75c355-3f77-4e5e-b2f8-f2786c2dbbb9', 'test4', 'MCC', 'Subjective/Objective', 1, 1, '2024-07-26T09:00Z', 180, 180, NULL, 'Draft', 0, 0, 0, 'English');

-- --------------------------------------------------------

--
-- Table structure for table `PaperApproval`
--

CREATE TABLE `PaperApproval` (
  `paperapproval_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int(11) NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `paper_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `faculty_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PaperComment`
--

CREATE TABLE `PaperComment` (
  `pc_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paper_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `faculty_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_generated` tinyint(1) NOT NULL DEFAULT '0',
  `time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SIA`
--

CREATE TABLE `SIA` (
  `siaId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studentId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paperId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'Not Attempted',
  `timeStarted` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timeCompleted` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `obtainedMarks` double NOT NULL DEFAULT '0',
  `fileName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SOA`
--

CREATE TABLE `SOA` (
  `soa_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `oq_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `p_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_attempted` tinyint(1) NOT NULL DEFAULT '0',
  `marksobtained` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SPA`
--

CREATE TABLE `SPA` (
  `spaId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studentId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paperId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'Not Attempted',
  `timeStarted` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timeCompleted` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currentQuestion` int(11) NOT NULL DEFAULT '1',
  `obtainedMarks` double NOT NULL DEFAULT '0',
  `studentComment` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `teacherComment` varchar(10000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `objectiveSolved` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SRC`
--

CREATE TABLE `SRC` (
  `src_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `p_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SSA`
--

CREATE TABLE `SSA` (
  `ssa_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sq_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `p_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` varchar(10000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `marksobtained` double NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Student`
--

CREATE TABLE `Student` (
  `p_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cgpa` double NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DOB` datetime(3) NOT NULL,
  `eval_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rank` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_picture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SubjectiveQuestion`
--

CREATE TABLE `SubjectiveQuestion` (
  `sq_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `questionnumber` int(11) NOT NULL,
  `question` varchar(5000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` varchar(5000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `difficulty` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `topic` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `authority` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `long_question` tinyint(1) NOT NULL DEFAULT '1',
  `marks` double NOT NULL,
  `paper_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_sq_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `course` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `SubjectiveQuestion`
--

INSERT INTO `SubjectiveQuestion` (`sq_id`, `questionnumber`, `question`, `answer`, `difficulty`, `topic`, `authority`, `long_question`, `marks`, `paper_id`, `parent_sq_id`, `course`, `subject`) VALUES
('0a40d1f4-7a03-4631-afcf-09b431ba17b9', 2, 'abcde', 'abcde', 'Easy', 'testTopic2', '-', 1, 1, '6f3a28b3-cede-40a7-b7ef-a7e875b56108', NULL, 'MCc', 'testSubj'),
('1a33f5ba-8d76-4fe1-b1b0-36d66e2b9ddc', 3, 'abcd', 'abcd', 'Easy', 'testTopic2', '-', 1, 1, '6f3a28b3-cede-40a7-b7ef-a7e875b56108', NULL, 'MCc', 'testSubj'),
('3ee48008-7260-48c3-8dae-e3482446c705', 1, 'q2', 'q2', 'Easy', 'testTopic2', '-', 1, 1, '6f3a28b3-cede-40a7-b7ef-a7e875b56108', NULL, 'MCc', 'testSubj'),
('7fb47191-6de8-4c96-809c-2a0ff076033b', 4, 'abcdaaa', 'abcd', 'Medium', 'topic', '-', 1, 1, '6f3a28b3-cede-40a7-b7ef-a7e875b56108', NULL, 'MCc', 'testSubj2');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('cfc874dc-7764-4293-ad8e-1a329d357a06', 'bb7125657e4d6d9e3f80a11389ceaa4735db36e6a771c414060ca67126e267e8', '2024-07-26 05:35:20.368', '20240405071832_mig', NULL, NULL, '2024-07-26 05:35:19.990', 1),
('d78fef4b-c61b-4b4b-b1a5-aca23b52c451', 'fa8671cab9d070ace54546fbc013fdc02a3dee0fbf6080baf8c02b0a7a979504', '2024-07-26 05:35:23.106', '20240726053523_new', NULL, NULL, '2024-07-26 05:35:23.092', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Course`
--
ALTER TABLE `Course`
  ADD PRIMARY KEY (`course_code`),
  ADD UNIQUE KEY `Course_course_code_key` (`course_code`);

--
-- Indexes for table `CoursePaper`
--
ALTER TABLE `CoursePaper`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CoursePaper_course_code_fkey` (`course_code`),
  ADD KEY `CoursePaper_paper_id_fkey` (`paper_id`);

--
-- Indexes for table `DataBankQuestion`
--
ALTER TABLE `DataBankQuestion`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `DbCourse`
--
ALTER TABLE `DbCourse`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `DbCourse_name_key` (`name`);

--
-- Indexes for table `DbSubject`
--
ALTER TABLE `DbSubject`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `DbSubject_name_course_key` (`name`,`course`),
  ADD KEY `DbSubject_course_fkey` (`course`);

--
-- Indexes for table `DbTopic`
--
ALTER TABLE `DbTopic`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `DbTopic_course_name_key` (`course`,`name`);

--
-- Indexes for table `Faculty`
--
ALTER TABLE `Faculty`
  ADD PRIMARY KEY (`faculty_id`),
  ADD UNIQUE KEY `Faculty_email_key` (`email`),
  ADD UNIQUE KEY `Faculty_pa_number_key` (`pa_number`);

--
-- Indexes for table `FTC`
--
ALTER TABLE `FTC`
  ADD PRIMARY KEY (`ftc_id`),
  ADD KEY `FTC_faculty_id_fkey` (`faculty_id`),
  ADD KEY `FTC_course_code_fkey` (`course_code`);

--
-- Indexes for table `IeQuestion`
--
ALTER TABLE `IeQuestion`
  ADD PRIMARY KEY (`ie_id`),
  ADD KEY `IeQuestion_paper_id_fkey` (`paper_id`);

--
-- Indexes for table `Ip`
--
ALTER TABLE `Ip`
  ADD UNIQUE KEY `Ip_ip_address_key` (`ip_address`);

--
-- Indexes for table `LinkedPaper`
--
ALTER TABLE `LinkedPaper`
  ADD PRIMARY KEY (`paperIdA`);

--
-- Indexes for table `Notification`
--
ALTER TABLE `Notification`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `Notification_faculty_id_fkey` (`faculty_id`);

--
-- Indexes for table `ObjectiveQuestion`
--
ALTER TABLE `ObjectiveQuestion`
  ADD PRIMARY KEY (`oq_id`),
  ADD KEY `ObjectiveQuestion_paper_id_fkey` (`paper_id`);

--
-- Indexes for table `Paper`
--
ALTER TABLE `Paper`
  ADD PRIMARY KEY (`paper_id`),
  ADD KEY `Paper_course_code_fkey` (`course_code`);

--
-- Indexes for table `PaperApproval`
--
ALTER TABLE `PaperApproval`
  ADD PRIMARY KEY (`paperapproval_id`),
  ADD UNIQUE KEY `PaperApproval_paper_id_key` (`paper_id`),
  ADD KEY `PaperApproval_faculty_id_fkey` (`faculty_id`);

--
-- Indexes for table `PaperComment`
--
ALTER TABLE `PaperComment`
  ADD PRIMARY KEY (`pc_id`),
  ADD KEY `PaperComment_paper_id_fkey` (`paper_id`),
  ADD KEY `PaperComment_faculty_id_fkey` (`faculty_id`);

--
-- Indexes for table `SIA`
--
ALTER TABLE `SIA`
  ADD PRIMARY KEY (`siaId`),
  ADD KEY `SIA_studentId_fkey` (`studentId`),
  ADD KEY `SIA_paperId_fkey` (`paperId`);

--
-- Indexes for table `SOA`
--
ALTER TABLE `SOA`
  ADD PRIMARY KEY (`soa_id`),
  ADD KEY `SOA_oq_id_fkey` (`oq_id`),
  ADD KEY `SOA_p_number_fkey` (`p_number`);

--
-- Indexes for table `SPA`
--
ALTER TABLE `SPA`
  ADD PRIMARY KEY (`spaId`),
  ADD KEY `SPA_studentId_fkey` (`studentId`),
  ADD KEY `SPA_paperId_fkey` (`paperId`);

--
-- Indexes for table `SRC`
--
ALTER TABLE `SRC`
  ADD PRIMARY KEY (`src_id`),
  ADD KEY `SRC_p_number_fkey` (`p_number`),
  ADD KEY `SRC_course_code_fkey` (`course_code`);

--
-- Indexes for table `SSA`
--
ALTER TABLE `SSA`
  ADD PRIMARY KEY (`ssa_id`),
  ADD KEY `SSA_sq_id_fkey` (`sq_id`),
  ADD KEY `SSA_p_number_fkey` (`p_number`);

--
-- Indexes for table `Student`
--
ALTER TABLE `Student`
  ADD PRIMARY KEY (`p_number`);

--
-- Indexes for table `SubjectiveQuestion`
--
ALTER TABLE `SubjectiveQuestion`
  ADD PRIMARY KEY (`sq_id`),
  ADD KEY `SubjectiveQuestion_paper_id_fkey` (`paper_id`),
  ADD KEY `SubjectiveQuestion_parent_sq_id_fkey` (`parent_sq_id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CoursePaper`
--
ALTER TABLE `CoursePaper`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CoursePaper`
--
ALTER TABLE `CoursePaper`
  ADD CONSTRAINT `CoursePaper_course_code_fkey` FOREIGN KEY (`course_code`) REFERENCES `Course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CoursePaper_paper_id_fkey` FOREIGN KEY (`paper_id`) REFERENCES `Paper` (`paper_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `DbSubject`
--
ALTER TABLE `DbSubject`
  ADD CONSTRAINT `DbSubject_course_fkey` FOREIGN KEY (`course`) REFERENCES `DbCourse` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `DbTopic`
--
ALTER TABLE `DbTopic`
  ADD CONSTRAINT `DbTopic_course_fkey` FOREIGN KEY (`course`) REFERENCES `DbCourse` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `FTC`
--
ALTER TABLE `FTC`
  ADD CONSTRAINT `FTC_course_code_fkey` FOREIGN KEY (`course_code`) REFERENCES `Course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FTC_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `Faculty` (`faculty_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `IeQuestion`
--
ALTER TABLE `IeQuestion`
  ADD CONSTRAINT `IeQuestion_paper_id_fkey` FOREIGN KEY (`paper_id`) REFERENCES `Paper` (`paper_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Notification`
--
ALTER TABLE `Notification`
  ADD CONSTRAINT `Notification_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `Faculty` (`faculty_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ObjectiveQuestion`
--
ALTER TABLE `ObjectiveQuestion`
  ADD CONSTRAINT `ObjectiveQuestion_paper_id_fkey` FOREIGN KEY (`paper_id`) REFERENCES `Paper` (`paper_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Paper`
--
ALTER TABLE `Paper`
  ADD CONSTRAINT `Paper_course_code_fkey` FOREIGN KEY (`course_code`) REFERENCES `Course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `PaperApproval`
--
ALTER TABLE `PaperApproval`
  ADD CONSTRAINT `PaperApproval_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `Faculty` (`faculty_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PaperApproval_paper_id_fkey` FOREIGN KEY (`paper_id`) REFERENCES `Paper` (`paper_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `PaperComment`
--
ALTER TABLE `PaperComment`
  ADD CONSTRAINT `PaperComment_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `Faculty` (`faculty_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PaperComment_paper_id_fkey` FOREIGN KEY (`paper_id`) REFERENCES `Paper` (`paper_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `SIA`
--
ALTER TABLE `SIA`
  ADD CONSTRAINT `SIA_paperId_fkey` FOREIGN KEY (`paperId`) REFERENCES `Paper` (`paper_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SIA_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student` (`p_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `SOA`
--
ALTER TABLE `SOA`
  ADD CONSTRAINT `SOA_oq_id_fkey` FOREIGN KEY (`oq_id`) REFERENCES `ObjectiveQuestion` (`oq_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SOA_p_number_fkey` FOREIGN KEY (`p_number`) REFERENCES `Student` (`p_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `SPA`
--
ALTER TABLE `SPA`
  ADD CONSTRAINT `SPA_paperId_fkey` FOREIGN KEY (`paperId`) REFERENCES `Paper` (`paper_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SPA_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student` (`p_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `SRC`
--
ALTER TABLE `SRC`
  ADD CONSTRAINT `SRC_course_code_fkey` FOREIGN KEY (`course_code`) REFERENCES `Course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SRC_p_number_fkey` FOREIGN KEY (`p_number`) REFERENCES `Student` (`p_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `SSA`
--
ALTER TABLE `SSA`
  ADD CONSTRAINT `SSA_p_number_fkey` FOREIGN KEY (`p_number`) REFERENCES `Student` (`p_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SSA_sq_id_fkey` FOREIGN KEY (`sq_id`) REFERENCES `SubjectiveQuestion` (`sq_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `SubjectiveQuestion`
--
ALTER TABLE `SubjectiveQuestion`
  ADD CONSTRAINT `SubjectiveQuestion_paper_id_fkey` FOREIGN KEY (`paper_id`) REFERENCES `Paper` (`paper_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SubjectiveQuestion_parent_sq_id_fkey` FOREIGN KEY (`parent_sq_id`) REFERENCES `SubjectiveQuestion` (`sq_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
