-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2021 at 11:39 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ark_zwallet`
--

-- --------------------------------------------------------

--
-- Table structure for table `phonenumber`
--

CREATE TABLE `phonenumber` (
  `id` varchar(80) NOT NULL,
  `userId` varchar(80) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `phonenumber`
--

INSERT INTO `phonenumber` (`id`, `userId`, `phoneNumber`) VALUES
('5a03499f-fb30-400f-84f1-93b4d3f5aa2e', '23fffd0e-3724-48fb-96fc-853e1dcaa134', '81392657117'),
('c9ad6f0d-3e6d-4f23-84eb-71568772cc5c', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', '0812385609');

-- --------------------------------------------------------

--
-- Table structure for table `topup`
--

CREATE TABLE `topup` (
  `id` varchar(80) NOT NULL,
  `userId` varchar(80) NOT NULL,
  `pin` int(11) NOT NULL,
  `balance` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `topup`
--

INSERT INTO `topup` (`id`, `userId`, `pin`, `balance`, `date`) VALUES
('14053bb3-62d0-4c55-a125-6baf4bd1aa98', 'e5e5a52b-cf2b-41a2-aa86-7bdbb482df20', 234567, 20000, '2021-01-27 15:55:07'),
('4010b436-4154-4164-bf87-21fa276e7c65', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 234567, 10000, '2021-01-29 17:08:09'),
('43ac8465-06c9-4f14-8ba0-58ebb11e188f', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 234567, 5000, '2021-01-29 16:48:17'),
('8e61b74b-ee0a-4c1b-a7f5-f283d184b1c3', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 234567, 50000, '2021-01-27 16:04:59'),
('930dcc43-6439-432d-9f50-4af0f32cb217', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 234567, 40000, '2021-01-28 23:00:59'),
('ba385695-3293-4768-b567-bd97384f1deb', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 610980, 10000, '2021-01-25 01:33:34'),
('d56d6e32-ae78-4c03-979f-f0afd956bbd4', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 610980, 1000, '2021-01-24 16:43:30'),
('fa2babae-4ef6-47cc-abee-a195424b97a4', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 123456, 2000, '2021-01-26 00:54:20');

-- --------------------------------------------------------

--
-- Table structure for table `transfer`
--

CREATE TABLE `transfer` (
  `id` varchar(80) NOT NULL,
  `receiverId` varchar(64) NOT NULL,
  `senderId` varchar(64) NOT NULL,
  `amount` int(255) NOT NULL,
  `senderPin` int(6) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` varchar(255) DEFAULT NULL,
  `transaction_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transfer`
--

INSERT INTO `transfer` (`id`, `receiverId`, `senderId`, `amount`, `senderPin`, `date_time`, `notes`, `transaction_status`) VALUES
('09505ed6-ebee-4319-9448-cef6f25c4359', 'a2f96d58-fe75-4ac9-b3b6-47d38a65fda0', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 20000, 234567, '2021-01-29 17:08:32', 'halo', 'SUCCESS'),
('20e37b0a-db80-41d7-b371-a65be4b9d134', 'fa6c5fe6-9dfa-4766-b7f0-d99e3ebab995', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 10000, 234567, '2021-01-28 18:48:52', 'untuk angga', 'SUCCESS'),
('21fbd2e3-928d-4295-a874-91521f93fad3', 'e5e5a52b-cf2b-41a2-aa86-7bdbb482df20', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 5000, 234567, '2021-01-27 16:02:14', 'buat jajan untuk shaula', 'SUCCESS'),
('23f1718c-78f0-425e-b49c-f0af37c62515', 'a2f96d58-fe75-4ac9-b3b6-47d38a65fda0', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 5000, 234567, '2021-01-28 23:01:18', '', 'SUCCESS'),
('2b498698-0a09-46b0-8d55-d0af1524cbb4', 'fa6c5fe6-9dfa-4766-b7f0-d99e3ebab995', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 10000, 234567, '2021-01-27 19:45:25', 'buat angga', 'SUCCESS'),
('623f5938-88bd-4d7b-9c7d-867bac381222', '4868b3aa-2055-4821-8ee3-9a0824669622', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 5000, 234567, '2021-01-28 22:29:10', 'untuk momo taro', 'SUCCESS'),
('74326e14-f3f3-40e3-9509-e290ed4bfa74', '4868b3aa-2055-4821-8ee3-9a0824669622', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 5000, 234567, '2021-01-27 19:48:36', 'buat momo', 'SUCCESS'),
('8179e4e1-c6ec-49ea-8992-7bbf2e65756a', '4868b3aa-2055-4821-8ee3-9a0824669622', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 5000, 234567, '2021-01-27 20:10:38', 'momo', 'SUCCESS'),
('8dd97011-ae18-4333-9d9b-ef6eeafbcafb', 'e5e5a52b-cf2b-41a2-aa86-7bdbb482df20', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 10000, 234567, '2021-01-27 17:57:38', 'jajan sate', 'SUCCESS'),
('a26eb763-886c-4795-a088-c395ced92886', '4868b3aa-2055-4821-8ee3-9a0824669622', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 10000, 123456, '2021-01-26 01:24:59', 'jajan', 'SUCCESS'),
('a8da78ab-cf22-4a33-9567-77b1110d10bc', 'fa6c5fe6-9dfa-4766-b7f0-d99e3ebab995', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 2000, 123456, '2021-01-26 01:11:16', 'cilok', 'SUCCESS'),
('ba2707c5-124f-405f-bff4-56e219fe3157', 'a2f96d58-fe75-4ac9-b3b6-47d38a65fda0', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 5000, 234567, '2021-01-28 22:59:53', '', 'SUCCESS'),
('c05ba5cd-5326-420f-ad7d-8950f234e989', '6499ac5d-0db0-416f-89b5-33d516ca3f41', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 5000, 123456, '2021-01-27 15:43:47', 'jajan', 'SUCCESS'),
('c1f85088-78ae-4159-bd96-480886e7110c', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 'e5e5a52b-cf2b-41a2-aa86-7bdbb482df20', 5000, 234567, '2021-01-27 15:55:32', 'untuk kakak sean', 'SUCCESS'),
('de49e63f-20ad-4bec-9eeb-d32c323fbf08', '6499ac5d-0db0-416f-89b5-33d516ca3f41', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 5000, 123456, '2021-01-27 08:42:19', 'jajan', 'SUCCESS'),
('e615de9b-a3af-49ff-ba0e-d4578dc7ef32', 'e5e5a52b-cf2b-41a2-aa86-7bdbb482df20', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 10000, 123456, '2021-01-27 15:54:34', 'untuk shaula', 'SUCCESS'),
('fa909856-5d1a-4c32-b793-317d0b6ff6dd', '23fffd0e-3724-48fb-96fc-853e1dcaa134', '0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 9000, 610980, '2021-01-24 17:31:14', 'hutang', 'SUCCESS');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(64) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `pin` int(6) DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `saldo` int(255) DEFAULT NULL,
  `expense` int(255) DEFAULT NULL,
  `income` int(255) DEFAULT NULL,
  `image` varchar(64) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `firstName`, `lastName`, `email`, `password`, `pin`, `phoneNumber`, `saldo`, `expense`, `income`, `image`, `isActive`, `createdAt`, `updatedAt`) VALUES
('0c3c14bb-0158-4e90-b60c-29ee3dbe40ae', 'sheanibra', 'Shean', 'Ibrahim Saga', 'shaulajasminetya04@gmail.com', '$2a$10$c78JEwhYwAB6RQJxtNsacOzFMudphBBtnGBSJ7NuXDktkoDcmpJCq', 234567, '0812345678', 40000, 75000, 15000, 'http://127.0.0.1:5000/upload/1611730659145-grapes.jpg', 1, '2021-01-21 14:25:24', '2021-01-21 14:25:24'),
('4868b3aa-2055-4821-8ee3-9a0824669622', 'momotaro', 'momo', 'taro', 'momotaro@gmail.com', '$2a$10$CAejgPRAhYSBXhnVv8Z0TeDAnWXPtk79xDpaDFoHSX/AgTJSt00vK', 890234, '08123456', 135000, 0, 0, 'http://127.0.0.1:5000/upload/1611432622690-flower.jpg', 1, '2020-12-07 17:42:06', '2020-12-07 17:42:06'),
('a2f96d58-fe75-4ac9-b3b6-47d38a65fda0', 'shau', 'first name', 'last name', 'shaulajasminetya22@gmail.com', '$2a$10$MEDpX9Cj6/5z2F56f97C7.ra/TQaLkBd8Ok3wH9jgO4F4ywQ44XPu', 0, '09383743434', 75000, 15000, 40000, 'http://127.0.0.1:5000/upload/avatar.jpg', 1, '2021-01-28 15:49:57', '2021-01-28 15:49:57'),
('e5e5a52b-cf2b-41a2-aa86-7bdbb482df20', 'sjasminetya', 'Shaula', 'Jasminetya Saga', 'shaulajasminetya@gmail.com', '$2a$10$gqQIhpxemyE.7Evoz429SeNzneXKsYm7IdXruMKJY5hW49JToGSJO', 234567, '0812347523', 50000, 5000, 0, 'http://127.0.0.1:5000/upload/1611737626772-flower.jpg', 1, '2021-01-27 08:51:51', '2021-01-27 08:51:51'),
('fa6c5fe6-9dfa-4766-b7f0-d99e3ebab995', 'anggapra', 'angga', 'prayuda', 'anggaprayuda@gmail.com', '$2a$10$B/d8vpSObIiowz.TAK36h.weMxGQ4FVZilFpIRLoJxkcDw7MvkBIm', 0, '08123456', 37000, 0, 0, 'http://127.0.0.1:5000/upload/1611432656135-grapes.jpg', 1, '2020-12-07 17:41:23', '2020-12-07 17:41:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `phonenumber`
--
ALTER TABLE `phonenumber`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `topup`
--
ALTER TABLE `topup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transfer`
--
ALTER TABLE `transfer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
