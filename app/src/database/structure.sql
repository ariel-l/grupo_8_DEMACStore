-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: demacstore_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(45) NOT NULL,
  `postal_code` int(4) NOT NULL,
  `province` varchar(40) NOT NULL,
  `city` varchar(40) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_FK` (`userId`),
  CONSTRAINT `addresses_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Samsung'),(2,'Motorola'),(3,'Xiaomi'),(4,'Apple'),(5,'Huawei'),(6,'LG');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Phones'),(2,'Accesories');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_products`
--

DROP TABLE IF EXISTS `order_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `productQuantity` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order__products_FK` (`productID`),
  KEY `orderproducts_FK` (`orderID`),
  CONSTRAINT `order__products_FK` FOREIGN KEY (`productID`) REFERENCES `products` (`id`),
  CONSTRAINT `orderproducts_FK` FOREIGN KEY (`orderID`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_products`
--

LOCK TABLES `order_products` WRITE;
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buyDate` date DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `userID` int(11) NOT NULL,
  `finalQuantity` int(20) NOT NULL,
  `finalPrice` int(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_FK` (`userID`),
  CONSTRAINT `orders_FK` FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `brandID` int(20) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `subcategoryID` int(11) NOT NULL,
  `model` varchar(40) DEFAULT NULL,
  `os` varchar(20) DEFAULT NULL,
  `screen` varchar(20) DEFAULT NULL,
  `internalMemory` varchar(20) DEFAULT NULL,
  `ram` varchar(20) DEFAULT NULL,
  `chipset` varchar(20) DEFAULT NULL,
  `frontCamera` varchar(20) DEFAULT NULL,
  `mainCamera` varchar(20) DEFAULT NULL,
  `video` varchar(100) DEFAULT NULL,
  `battery` varchar(20) DEFAULT NULL,
  `dimensions` varchar(100) DEFAULT NULL,
  `weight` varchar(20) DEFAULT NULL,
  `cardSlot` varchar(20) DEFAULT NULL,
  `description` varchar(450) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_FK` (`subcategoryID`),
  KEY `products_FK_1` (`brandID`),
  CONSTRAINT `products_FK` FOREIGN KEY (`subcategoryID`) REFERENCES `subcategories` (`id`),
  CONSTRAINT `products_FK_1` FOREIGN KEY (`brandID`) REFERENCES `brands` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Motorola E32','1681864005252_products_.png',2,60000,10,1,'E32','Android 11','6.5','64','4','Unisoc T606  1.6 GHz','8','16','1920 px x 1080 px','5000','163.95 x 74.94 x 8.49 ','184','','Mayor rendimiento\r\nSu memoria RAM de 4 GB permite que tu smartphone funcione de manera fluida y sin demoras al realizar distintas tareas, jugar o navegar.\r\n\r\nDesbloqueo facial y dactilar\r\nMáxima seguridad para que solo vos puedas acceder al equipo. Podrás elegir entre el sensor de huella dactilar para habilitar el teléfono en un toque, o el reconocimiento facial que permite un desbloqueo hasta un 30% más rápido.',NULL,'2023-04-19 00:47:39'),(2,'Motorola Edge 30 5G','1681864435409_products_.svg',2,138699,3,1,'Moto Edge 30','Android 12','OLED de 6.5','128','8','Snapdragon 778G+ 5G ','32','50','3840 x 2160 ','4020','159.38 x 74.236 x 6.76 ','155','','Capacidad y eficiencia\r\nCon su potente procesador y memoria RAM de 8 GB tu equipo alcanzará un alto rendimiento con gran velocidad de transmisión de contenidos y ejecutará múltiples aplicaciones a la vez sin demoras.\r\n',NULL,'2023-04-19 00:33:55'),(3,'Motorola G22 128 GB','1681864706601_products_.svg',2,70999,3,1,'G22 ','Android 12','6.5','128','4','Mediatek MT6765V/CB ','16','50','1920 x 1080 ','5000','163.95 x 74.94 x 8.49 ','185','1000','Mayor rendimiento\r\nSu memoria RAM de 4 GB permite que tu smartphone funcione de manera fluida y sin demoras al realizar distintas tareas, jugar o navegar.',NULL,'2023-04-19 00:38:26'),(4,'Motorola Moto G52 Xt2221 128gb ','1681864941406_products_.svg',2,100999,5,1,'G52','Android 12','6.6','128 ','4','Snapdragon 680','16','50 ','1920 x 1080 ','5000','160.98 x 74.46 x 7.99 ','169','1000','El Motorola Moto G52 es un nuevo miembro de la familia Moto G de smartphones económicos. El Moto G52 cuenta con una pantalla OLED de 6.6 pulgadas a resolución Full HD+ y tasa de refresco de 90Hz, y está potenciado por un procesador Qualcomm Snapdragon 680 con 4GB de RAM y 128GB de almacenamiento interno. Con una cámara triple de 50MP en su dorsal, el Moto G52 tiene una cámara selfie de 16MP, batería de 5000 mAh de carga rápida TurboPower de 30W, ',NULL,'2023-04-19 00:42:21'),(6,'Funda Para Motorola E32 Anti Golpes','1681865176755_products_.webp',2,1499,5,1,'','','0','0','0','','0','0','','0','0','0','','Funda Anti golpes disponibles para Motorola E32. Super estéticas\r\nExcelente protección. Puntas reforzadas.\r\nTotalmente transparente.\r\n','2023-04-18 22:36:23','2023-04-19 00:47:23'),(8,'Funda Para Motorola Moto G22 Antigolpe A','1681865813540_products_.webp',2,4899,25,1,'','','0','0','0','','0','0','','0','0','0','0','Sencillo, cómodo, fácil de llevar. Protege adecuadamente los dispositivos contra raspaduras, suciedad, rasgaduras y desgaste normales. Fácil acceso a todos los puertos y botones sin quitar la funda.\r\nEl soporte de anillo magnético hace que sea más conveniente usar su teléfono.\r\nHecho de material PC y TPU, es resistente y duradero.','2023-04-19 00:56:53','2023-04-19 00:56:53'),(9,'Motorola G72 128 GB ','1681866323192_products_.webp',2,119999,15,1,'G72 ','Android 12','0','128','6','MediaTek Helio G99 2','16','108','1920 x 1080 ','5000','0','173','','Fotografía profesional en tu bolsillo. Descubrí infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo. Poné a prueba tu creatividad y jugá con la iluminación, diferentes planos y efectos para obtener grandes resultados.\r\nAdemás, el dispositivo cuenta con cámara frontal de 16 Mpx para que puedas sacarte divertidas selfies o hacer videollamadas.\r\nCon su potente procesador y memoria RAM de 6 GB tu equipo alcanzará un alto','2023-04-19 01:01:50','2023-04-19 01:05:23');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `categoriesID` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productsubcategories_FK` (`categoriesID`),
  CONSTRAINT `productsubcategories_FK` FOREIGN KEY (`categoriesID`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'News',1,NULL,NULL),(2,'Refubrishes',1,NULL,NULL);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `lastName` varchar(40) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` int(14) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `role` varchar(14) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_un` (`email`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'admin','Admin','Formar','admin@mail.com','$2a$10$slgWzUnv3oYRt2/wCr3mfeCUtgtDuamxZX6IlbE1HNBI4B.DC2/he',1122334455,'1679261776411_avatar_.png',NULL,NULL,'admin'),(8,'user','User','Formar','user@mail.com','$2a$10$yIvbeWwUhPiytFOaJIH3NuXyakKzjgTjLwMT6A7s9ERLHBvSIZkBC',1415138586,'default-image.png',NULL,NULL,'user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'demacstore_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-18 22:07:45
