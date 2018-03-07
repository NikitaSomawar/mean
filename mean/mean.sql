-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2018 at 09:21 AM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mean`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(50) NOT NULL,
  `product_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `product_id`) VALUES
(16, 4, 2),
(17, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `contact` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `contact`) VALUES
(25, 'nik', '9145555914'),
(26, 'nikita', '353'),
(27, 'jayshree', '4535'),
(28, 'nik', '9145555914');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_cost` varchar(30) NOT NULL,
  `product_discount` varchar(30) NOT NULL,
  `product_catagoery` varchar(30) NOT NULL,
  `product_availability` varchar(30) NOT NULL,
  `product_available_count` varchar(30) NOT NULL,
  `product_description` varchar(500) NOT NULL,
  `currency` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_cost`, `product_discount`, `product_catagoery`, `product_availability`, `product_available_count`, `product_description`, `currency`) VALUES
(1, 'head phones', '10', '', 'electrical', '1', '10', 'Logitech stereo headset|Speak clearly with this simple, versatile headset with stereo sound', ''),
(2, 'pendrive', '10', '', 'electrical', '1', '5', 'Compact Design for Maximum Portability|Store more with capacities up to 16gb 5-year limited warranty|High-Capacity Drive Accommodates Your Favorite Media Files', 'rs'),
(3, 'bluetooth keyboard', '10', '', 'electrical', '1', '10', 'UNIVERSAL COMPATIBILITY Fully functional to all three major operating system: IOS/Android/Windows, and features system-specific function keys for each operating systems. Bluetooth supported devices such as laptop, computer, tablet, Smartphone can easily paired and gain quick access to common functions, such as volume level, playback control, copy paste text, and more.', 'rs'),
(4, 'laptop table', '10', '', 'furniture', '1', '6', 'Multi-function notebook table could be used as a portable laptop table, laptop holder, bed table, reading table and many more. Also suitable for car and traveling purpose.|ADJUSTABLE LEGS & TRAY: Equipped with 360 degree rotational legs allowing you to set the laptop lap tray at your desired height and position. Tray is able to tilt at the perfect angle allowing you to work on your laptop or read your favorite book', 'rs'),
(5, 'wooden bass table lamp', '10', '', 'furniture', '1', '9', 'Wooden Base Dimensions: 5\" length x 5\" width x 2\" height|Holder: E-27 (Regular Screw Type) Switch Holder|Bulb Compatible: LED, CFL, Incadescent. (Not included in the package)', 'rs'),
(6, 'Stephain Core Solid Wood 4 Seater Dining Table Set', '10', '', 'furniture', '1', '6', 'Room Type Dining Room Height 76.2Cm Width 91.4Cm Depth 114.3Cm Assembly No Primary Material Solid Woodsku Ss1005 Color Walnutfinish Walnet Finish|Product Dimensions 114.3 X 91.4 X 76.2 Cm', 'rs');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `username`, `password`, `email`, `contact`) VALUES
(1, 'nikita', '123', '', ''),
(4, 'nikita somawar', '123', 'nikita_somawar@rediffmail.com', '9145555656');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
