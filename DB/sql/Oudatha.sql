-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.29 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for oudatha
CREATE DATABASE IF NOT EXISTS `oudatha` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `oudatha`;

-- Dumping structure for table oudatha.appointment
CREATE TABLE IF NOT EXISTS `appointment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `appPatientId` int DEFAULT NULL,
  `appDrId` int DEFAULT NULL,
  `appSlotId` int DEFAULT NULL,
  `patientComment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `drPrescription` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `followUp` bit(1) DEFAULT b'0',
  `followUpDate` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `patientReport` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `appStatusId` int DEFAULT NULL,
  `reason` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_appointment_appointmentstatus` (`appStatusId`),
  KEY `FK_appointment_user` (`appPatientId`) USING BTREE,
  KEY `FK_appointment_user_2` (`appDrId`) USING BTREE,
  KEY `FK_appointment_doctorappointmentslot` (`appSlotId`) USING BTREE,
  CONSTRAINT `FK_appointment_appointmentstatus` FOREIGN KEY (`appStatusId`) REFERENCES `appointmentstatus` (`appStatusId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_appointment_doctorappointmentslot` FOREIGN KEY (`appSlotId`) REFERENCES `doctorappointmentslot` (`slotId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_appointment_user` FOREIGN KEY (`appPatientId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_appointment_user_2` FOREIGN KEY (`appDrId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table oudatha.appointment: ~6 rows (approximately)
DELETE FROM `appointment`;
INSERT INTO `appointment` (`id`, `appPatientId`, `appDrId`, `appSlotId`, `patientComment`, `drPrescription`, `followUp`, `followUpDate`, `patientReport`, `appStatusId`, `reason`) VALUES
	(11, 108, 107, 2, 'patientComment', NULL, b'0', NULL, NULL, 4, 'reason'),
	(12, 110, 114, 210, 'patientComment', 'updatd', b'0', '4-4-4', 'rrrr', 2, 'reason'),
	(13, 134, 114, 212, 'patientComment', 'updatd', b'0', '4-4-4', 'rrrr', 7, 'reason'),
	(14, 133, 114, 210, 'patientComment', 'muthu', b'0', '5-27-23', 'update report lat', 7, 'reason'),
	(15, 110, 114, 211, 'patientComment', NULL, b'0', NULL, NULL, 4, 'reason'),
	(16, 133, 114, 215, 'patientCommenty', NULL, b'0', NULL, NULL, 4, 'reasony');

-- Dumping structure for table oudatha.appointmentstatus
CREATE TABLE IF NOT EXISTS `appointmentstatus` (
  `appStatusId` int NOT NULL AUTO_INCREMENT,
  `appStatusName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`appStatusId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oudatha.appointmentstatus: ~6 rows (approximately)
DELETE FROM `appointmentstatus`;
INSERT INTO `appointmentstatus` (`appStatusId`, `appStatusName`) VALUES
	(1, 'patientcanceled'),
	(2, 'created'),
	(3, 'doccanceled'),
	(4, 'reviewPending'),
	(5, 'followup'),
	(6, 'autocanceled'),
	(7, 'completed');

-- Dumping structure for table oudatha.category
CREATE TABLE IF NOT EXISTS `category` (
  `catid` int NOT NULL AUTO_INCREMENT,
  `categories` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `catimage` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` bit(1) DEFAULT b'1',
  PRIMARY KEY (`catid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oudatha.category: ~5 rows (approximately)
DELETE FROM `category`;
INSERT INTO `category` (`catid`, `categories`, `catimage`, `status`) VALUES
	(1, 'Dental', 'Null\r\n', b'1'),
	(2, 'Cardiologist', 'Null', b'1'),
	(3, 'Opthalmologist', 'Null', b'1'),
	(4, 'Neurologist', 'Null', b'1'),
	(5, 'ENT', 'Null', b'1');

-- Dumping structure for table oudatha.doctorappointmentslot
CREATE TABLE IF NOT EXISTS `doctorappointmentslot` (
  `slotId` int NOT NULL AUTO_INCREMENT,
  `appDrId` int DEFAULT NULL,
  `drAppDate` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `slot` varchar(50) DEFAULT NULL,
  `doctorStatus` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`slotId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oudatha.doctorappointmentslot: ~15 rows (approximately)
DELETE FROM `doctorappointmentslot`;
INSERT INTO `doctorappointmentslot` (`slotId`, `appDrId`, `drAppDate`, `slot`, `doctorStatus`) VALUES
	(1, 112, '2023-06-28', '03:00:00', NULL),
	(2, 107, '2023-00-03', '04:00:00', NULL),
	(3, 111, '2023-07-05', '15:20:51', 'ac'),
	(210, 114, '2023-07-20', '12:00', NULL),
	(211, 114, '2023-07-21', '12:30', NULL),
	(212, 114, '2023-07-20', '13:30', NULL),
	(213, 114, '2023-07-20', '13:00', NULL),
	(214, 114, '2023-08-16', '11:11', NULL),
	(215, 114, '2023-08-16', '11:41', NULL),
	(216, 114, '2023-08-16', '12:11', NULL),
	(217, 114, '2023-08-16', '12:41', NULL),
	(218, 114, '2023-08-16', '13:11', NULL),
	(219, 114, '2023-08-16', '13:41', NULL),
	(220, 114, '2023-08-16', '14:11', NULL),
	(221, 114, '2023-08-16', '14:41', NULL);

-- Dumping structure for table oudatha.doctorcategorymap
CREATE TABLE IF NOT EXISTS `doctorcategorymap` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL DEFAULT '0',
  `categoryId` int NOT NULL DEFAULT '0',
  `docexpreience` float NOT NULL DEFAULT '0',
  `doccertificatenum` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `drDesignation` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  KEY `FK_doctorcategorysmap_user` (`userId`),
  KEY `FK_doctorcategorysmap_category` (`categoryId`) USING BTREE,
  CONSTRAINT `FK_doctorcategorymap_category` FOREIGN KEY (`categoryId`) REFERENCES `category` (`catid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_doctorcategorysmap_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table oudatha.doctorcategorymap: ~6 rows (approximately)
DELETE FROM `doctorcategorymap`;
INSERT INTO `doctorcategorymap` (`id`, `userId`, `categoryId`, `docexpreience`, `doccertificatenum`, `drDesignation`, `status`) VALUES
	(1, 107, 1, 3, '1007', 'MBBS', b'1'),
	(2, 108, 5, 4, '1009', 'MBBS', b'1'),
	(3, 112, 2, 3.3, '1009', 'MBBS', b'1'),
	(4, 113, 2, 2.3, '1078', 'MBBS', b'1'),
	(5, 114, 3, 2.3, '1078', 'MBBS', b'1'),
	(6, 120, 3, 2.3, '1078', 'MBBS', b'1'),
	(25, 183, 3, 7.5, '199', 'MBBS', b'1');

-- Dumping structure for procedure oudatha.getdoctorappointmentslotlist
DELIMITER //
CREATE PROCEDURE `getdoctorappointmentslotlist`(
	IN `doctorId` INT,
	IN `drAppDate` VARCHAR(50),
	IN `startTime` VARCHAR(50),
	IN `endTime` VARCHAR(50),
	IN `intervalTime` INT
)
BEGIN
SET @Comma = ', ';
SET GLOBAL log_bin_trust_function_creators = 1;

  	SET @appStartHour = 0;
  	SET @appStartMin= 0;
SET @appStartHour =SUBSTRING_INDEX(startTime,':',1);
SET @appStartMin =SUBSTRING_INDEX(startTime,':',-1);
SET @appEndHour =SUBSTRING_INDEX(endTime,':',1);
SET @appEndMin =SUBSTRING_INDEX(endTime,':',-1);

 while @appStartHour < @appEndHour do
 
 INSERT INTO doctorappointmentslot(drAppDate,appDrId,slot)VALUES(drAppDate,doctorId,CONCAT(@appStartHour,':',LPAD(@appStartMin,2,0)));
 
 SET @appStartMin =@appStartMin +intervalTime;
 IF @appStartMin >=60 then
 SET @appStartMin =@appStartMin -60;
 SET @appStartHour =@appStartHour +1;
 END IF;
 
 END While;


END//
DELIMITER ;

-- Dumping structure for procedure oudatha.getuserlist
DELIMITER //
CREATE PROCEDURE `getuserlist`()
BEGIN
SELECT * FROM user;
END//
DELIMITER ;

-- Dumping structure for table oudatha.rating
CREATE TABLE IF NOT EXISTS `rating` (
  `ratingId` int NOT NULL AUTO_INCREMENT,
  `appId` int NOT NULL DEFAULT '0',
  `ratingStars` int DEFAULT NULL,
  `drId` int DEFAULT NULL,
  `ratingReviewCmd` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` bit(1) DEFAULT b'1',
  PRIMARY KEY (`ratingId`),
  KEY `FK_rating_appointment` (`appId`) USING BTREE,
  CONSTRAINT `FK_rating_appointment` FOREIGN KEY (`appId`) REFERENCES `appointment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oudatha.rating: ~9 rows (approximately)
DELETE FROM `rating`;
INSERT INTO `rating` (`ratingId`, `appId`, `ratingStars`, `drId`, `ratingReviewCmd`, `status`) VALUES
	(1, 13, 1, 114, 'Cmdd22d2', b'1'),
	(2, 13, 4, 114, 'Cmdd22d2', b'1'),
	(3, 13, 4, 114, 'Cmdd22d2', b'1'),
	(4, 11, 4, 107, 'Cmdd22d2', b'1'),
	(5, 11, 4, 107, 'Cmdd22d2', b'1'),
	(6, 13, 4, 114, 'Cmdd22d2', b'1'),
	(7, 13, 4, 114, 'Cmdd22d2', b'1'),
	(8, 13, 4, 114, 'Cmdd22d2', b'1'),
	(9, 13, 4, 114, 'Cmdd22d2', b'1'),
	(10, 13, 5, 114, 'Cmdd22d2', b'1');

-- Dumping structure for table oudatha.role
CREATE TABLE IF NOT EXISTS `role` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0',
  `shortName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  PRIMARY KEY (`roleId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oudatha.role: ~2 rows (approximately)
DELETE FROM `role`;
INSERT INTO `role` (`roleId`, `roleName`, `shortName`, `status`) VALUES
	(1, 'Doctor', 'DR', b'0'),
	(2, 'Patient', 'P', b'0'),
	(3, 'Admin', 'A', b'0');

-- Dumping structure for table oudatha.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `password` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `gender` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `phonenumber` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `imageUrl` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `ratingCount` int DEFAULT NULL,
  `status` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=latin1;

-- Dumping data for table oudatha.user: ~23 rows (approximately)
DELETE FROM `user`;
INSERT INTO `user` (`id`, `username`, `password`, `gender`, `phonenumber`, `email`, `imageUrl`, `rating`, `ratingCount`, `status`) VALUES
	(107, 'tamil', 'tamil', 'male', '111111', 'tamil@gmail.com', 'image_1693809737565.jpg', 4, 2, b'1'),
	(108, 'muthu', '$2a$08$n/UPgJyHzHrbvtXi3k0yn.YhZjDopNzcHz95UpU5Q1Ky94VTiNuda', 'male', '1111112222', 'muthu@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(109, 'devi', '$2a$08$n/UPgJyHzHrbvtXi3k0yn.YhZjDopNzcHz95UpU5Q1Ky94VTiNuda', 'female', '333332222', 'devi@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(110, 'sathish', '$2a$08$n/UPgJyHzHrbvtXi3k0yn.YhZjDopNzcHz95UpU5Q1Ky94VTiNuda', 'male', '333332222', 'sathish@gmail.com', 'images_1693812244838.jpg', NULL, NULL, b'1'),
	(111, 'GURU', 'guru', 'male', '999999999', 'guru@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(112, 'GURU1', 'guru1', 'male', '999999999', 'guru11@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(113, 'GURU2', 'guru2', 'male', '999999999', 'guru2@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(114, 'guru3', '$2a$08$n/UPgJyHzHrbvtXi3k0yn.YhZjDopNzcHz95UpU5Q1Ky94VTiNuda', 'male', '999999999', 'guru3@gmail.com', 'image_1693809207392.jpg', 3.75, 8, b'1'),
	(118, 'arjun', 'arjun', 'male', '333332222', 'arjun@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(120, 'lenin', '$2b$10$ivhuy60YxrB8nDcjxd3o2e817OWXWJlXIrpMh2ut0INtrj1nouDTK', 'male', '999999999', 'lenin@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(133, 'aaa11', '$2b$08$KuqKtwxA9vIYx9fqWmyCHO46PtOujqSkj3GyrYH6WxbCjT/RIpSAO', 'male', '2222', 'aaa11@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(134, 'open', '$2b$08$qAiz5mjAIia.9HhVHQa7ou/MXVEFglQG1/JhzmxQjeqQNpzw5b1yC', 'male', '2222', 'open@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(135, 'CUT', '$2b$08$zKFBlTMiPpMyB9kZkR88FOBcZIBmUPsdTsHnOZgecpkEQQZy166wK', 'male', '2222', 'CUT@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(141, 'selvan', '$2b$08$sOmx9X7Gihl4clTgwuiRJOcBPF7RdMkAlmgqDV9pFmcnkdOCBWOPm', 'Male', '123456789', 'selvan@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(142, 'CUT22', '$2b$08$YgWIXSvnYZTh/ba13q81eOq5cVGZakwuszd.tWVjESWpZi1PeS6LG', 'male', '222222', 'CUT22@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(143, 'uuu', '$2b$08$nrTX7gkDtVHDQfu8/dzG9eY4tn7H4IAJhjMUXIjvyI7nb7IEKlaYO', 'male', '222222', 'muth333@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(144, 'naga', '$2b$08$xKsda1dHPX54jiOJvGCAdeORDEflhCFzJJvAz5E7sOx7uCS4A/uaq', 'male', '222222', 'muth33333@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(145, 'unitech23', '$2b$08$SYJm8MEgiS7D7Rn.wHnji.bLmucZ1PvOxW.55hZ8H86YLZgT4/wia', 'male', '222222', 'unitech33333@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(146, 'muthalagan', '$2b$08$m/C/YhSKM2HZS8ydZtgacuICjHKrePL.DnBCc7jwa4u2yuFmUDeAO', 'male', '222222', 'nmuthalagan@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(147, 'leela', '$2b$08$CUaIxZrkSNoben7wtU/aFuBHA0PcArOyzUaeoveThQT8m3edPQi3K', 'male', '222222', 'leela@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(181, 'look', '$2b$08$9p1tv3pMCBOj2CjYsM3X8etOKFNiX8n19iFgGXYRXnEBO8MQ.bKMi', 'male', '3222222', 'look@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(182, 'punar33', '$2b$08$tyAZFWgMyNxZgly4KYbUJ.KEFMgXBGejYqxWOBpXfZFqQ1rt./sBi', 'male', '9929428888', 'punar33@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(183, 'drdesign', '$2b$08$e.77HSGJK56gIqWFP6PMZe8B5ve1sD9JZ/r4ay8wEocqkXnxKbFO.', 'male', '928888', 'drdesign@gmail.com', 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(184, NULL, NULL, NULL, NULL, NULL, 'image_1693809737565.jpg', NULL, NULL, b'1'),
	(185, NULL, NULL, NULL, NULL, NULL, 'image_1693809737565.jpg', NULL, NULL, b'1');

-- Dumping structure for table oudatha.userimage
CREATE TABLE IF NOT EXISTS `userimage` (
  `userImageId` int NOT NULL AUTO_INCREMENT,
  `userImage` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `userImg` longblob NOT NULL,
  `status` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`userImageId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oudatha.userimage: ~13 rows (approximately)
DELETE FROM `userimage`;
INSERT INTO `userimage` (`userImageId`, `userImage`, `userImg`, `status`) VALUES
	(1, 'img1.jpg', _binary '', b'1'),
	(2, 'img2.jpg', _binary '', b'1'),
	(3, 'img3.jpg', _binary '', b'1'),
	(4, 'img4.jpg', _binary '', b'1'),
	(5, 'img5.jpg', _binary '', b'1'),
	(6, 'image_1693632581570.jpg', _binary '', b'1'),
	(7, '', _binary 0x696d6167655f313639333635303937373036382e6a7067, b'1'),
	(8, '', _binary 0x696d6167655f313639333635313037393034302e676966, b'1'),
	(9, '', _binary 0x696d6167655f313639333635313139343538372e6a7067, b'1'),
	(10, '', _binary 0x696d6167655f313639333635313338303630382e6a7067, b'1'),
	(11, '', _binary 0x696d6167655f313639333637323433363830362e6a7067, b'1'),
	(12, '', _binary 0x696d6167655f313639333637323534383836382e6a7067, b'1'),
	(13, '', _binary 0x696d6167655f313639333637323538353735302e6a7067, b'1'),
	(14, '', _binary 0x696d6167655f53454c454354207573657249642066726f6d2075736572696d6167652e6a7067, b'1'),
	(15, '', _binary 0x696d6167655f7b2753454c454354207573657249642066726f6d2075736572696d61676527207d2e6a7067, b'1');

-- Dumping structure for table oudatha.userrolemap
CREATE TABLE IF NOT EXISTS `userrolemap` (
  `userRoleMapId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  PRIMARY KEY (`userRoleMapId`) USING BTREE,
  KEY `FK_userrolemap_user` (`userId`),
  KEY `FK_userrolemap_role` (`roleId`),
  CONSTRAINT `FK_userrolemap_role` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_userrolemap_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table oudatha.userrolemap: ~18 rows (approximately)
DELETE FROM `userrolemap`;
INSERT INTO `userrolemap` (`userRoleMapId`, `userId`, `roleId`, `status`) VALUES
	(1, 107, 1, b'1'),
	(2, 108, 2, b'1'),
	(3, 109, 3, b'1'),
	(4, 110, 2, b'1'),
	(5, 111, 1, b'1'),
	(6, 112, 1, b'1'),
	(7, 113, 1, b'1'),
	(8, 114, 1, b'1'),
	(24, 133, 2, NULL),
	(25, 134, 2, NULL),
	(26, 135, 2, NULL),
	(27, 141, 2, NULL),
	(28, 142, 2, NULL),
	(29, 143, 2, NULL),
	(30, 144, 2, NULL),
	(31, 145, 2, NULL),
	(32, 146, 2, NULL),
	(33, 147, 2, NULL),
	(65, 181, 2, NULL),
	(66, 182, 1, NULL),
	(67, 183, 1, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
