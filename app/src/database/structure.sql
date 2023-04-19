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

CREATE DATABASE IF NOT EXISTS demacstore_db;
USE demacstore_db;

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Samsung'),(2,'Motorola'),(3,'Xiaomi'),(4,'Apple'),(5,'Huawei'),(6,'LG'),(7,'Otra');
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
INSERT INTO `categories` VALUES (1,'Phones'),(2,'Accessories');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Motorola E32','1681864005252_products_.png',2,60000,10,1,'E32','Android 11','6.5','64','4','Unisoc T606  1.6 GHz','8','16','1920 px x 1080 px','5000','163.95 x 74.94 x 8.49 ','184','','Mayor rendimiento\r\nSu memoria RAM de 4 GB permite que tu smartphone funcione de manera fluida y sin demoras al realizar distintas tareas, jugar o navegar.\r\n\r\nDesbloqueo facial y dactilar\r\nMáxima seguridad para que solo vos puedas acceder al equipo. Podrás elegir entre el sensor de huella dactilar para habilitar el teléfono en un toque, o el reconocimiento facial que permite un desbloqueo hasta un 30% más rápido.',NULL,'2023-04-19 00:47:39'),(2,'Motorola Edge 30 5G','1681864435409_products_.svg',2,138699,3,1,'Moto Edge 30','Android 12','OLED de 6.5','128','8','Snapdragon 778G+ 5G ','32','50','3840 x 2160 ','4020','159.38 x 74.236 x 6.76 ','155','','Capacidad y eficiencia\r\nCon su potente procesador y memoria RAM de 8 GB tu equipo alcanzará un alto rendimiento con gran velocidad de transmisión de contenidos y ejecutará múltiples aplicaciones a la vez sin demoras.\r\n',NULL,'2023-04-19 00:33:55'),(3,'Motorola G22 128 GB','1681864706601_products_.svg',2,70999,3,1,'G22 ','Android 12','6.5','128','4','Mediatek MT6765V/CB ','16','50','1920 x 1080 ','5000','163.95 x 74.94 x 8.49 ','185','1000','Mayor rendimiento\r\nSu memoria RAM de 4 GB permite que tu smartphone funcione de manera fluida y sin demoras al realizar distintas tareas, jugar o navegar.',NULL,'2023-04-19 00:38:26'),(4,'Motorola Moto G52 Xt2221 128gb ','1681864941406_products_.svg',2,100999,5,1,'G52','Android 12','6.6','128 ','4','Snapdragon 680','16','50 ','1920 x 1080 ','5000','160.98 x 74.46 x 7.99 ','169','1000','El Motorola Moto G52 es un nuevo miembro de la familia Moto G de smartphones económicos. El Moto G52 cuenta con una pantalla OLED de 6.6 pulgadas a resolución Full HD+ y tasa de refresco de 90Hz, y está potenciado por un procesador Qualcomm Snapdragon 680 con 4GB de RAM y 128GB de almacenamiento interno. Con una cámara triple de 50MP en su dorsal, el Moto G52 tiene una cámara selfie de 16MP, batería de 5000 mAh de carga rápida TurboPower de 30W, ',NULL,'2023-04-19 00:42:21'),(6,'Funda Para Motorola E32 Anti Golpes','1681865176755_products_.webp',2,1499,5,1,'','','0','0','0','','0','0','','0','0','0','','Funda Anti golpes disponibles para Motorola E32. Super estéticas\r\nExcelente protección. Puntas reforzadas.\r\nTotalmente transparente.\r\n','2023-04-18 22:36:23','2023-04-19 00:47:23'),(8,'Funda Para Motorola Moto G22 Antigolpe A','1681865813540_products_.webp',2,4899,25,1,'','','0','0','0','','0','0','','0','0','0','0','Sencillo, cómodo, fácil de llevar. Protege adecuadamente los dispositivos contra raspaduras, suciedad, rasgaduras y desgaste normales. Fácil acceso a todos los puertos y botones sin quitar la funda.\r\nEl soporte de anillo magnético hace que sea más conveniente usar su teléfono.\r\nHecho de material PC y TPU, es resistente y duradero.','2023-04-19 00:56:53','2023-04-19 00:56:53'),(9,'Motorola G72 128 GB ','1681866323192_products_.webp',2,119999,15,1,'G72 ','Android 12','0','128','6','MediaTek Helio G99 2','16','108','1920 x 1080 ','5000','0','173','','Fotografía profesional en tu bolsillo. Descubrí infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo. Poné a prueba tu creatividad y jugá con la iluminación, diferentes planos y efectos para obtener grandes resultados.\r\nAdemás, el dispositivo cuenta con cámara frontal de 16 Mpx para que puedas sacarte divertidas selfies o hacer videollamadas.\r\nCon su potente procesador y memoria RAM de 6 GB tu equipo alcanzará un alto','2023-04-19 01:01:50','2023-04-19 01:05:23'),(10,'Samsung A23 128GB Negro','1681934611068_products_.png',1,111000,5,1,'A23 128GB','Android','6.6','128','4','Octa-Core 2.4GHz, 1.','8','50','1080p@30fps','5000','165.4 x 76.9 x 8.4','195','1','● Alucinante Pantalla Full HD+ para disfrutar todo tu contenido\r\n\r\n● Diseño elegante y simétrico \r\n\r\n● Mejorá tus fotos con la cuádruple Cámara trasera','2023-04-19 03:07:27','2023-04-19 20:03:31'),(11,'Samsung A34 5G 256GB Graphite','1681929205764_products_.png',1,170000,10,1,'A34 5G 256GB','android','6.6','256','8','Octa-Core 2.6GHz, 2G','13','48','1.080 x 2.340p','5000','0','199','1','El Galaxy A34 5G registra tus mejores momentos en colores vívidos y brillantes, incluso en la oscuridad, y ajusta el encuadre para que nadie se quede fuera de la foto gracias al enfoque automático.','2023-04-19 18:33:25','2023-04-19 18:33:25'),(12,'Samsung A53 5G 128GB Negro','1681941863907_products_.svg',1,164000,25,1,'A53 5G 128GB','Android','6.4','128','6','Octa-Core 2.4GHz, 2G','32','64','1080 x 2400 (FHD+)','5000','0','189','','El celular Samsung Galaxy A53 está diseñado para destacar gracias a su estilo elegante y delgado con un acabado mate en color negro imposible de pasar desapercibido. ','2023-04-19 18:45:01','2023-04-19 22:04:23'),(13,'Samsung A33 128GB','1681930882720_products_.svg',1,110000,5,2,'A33 128GB','Android','6.4','128','6','Octa-Core 2.4GHz, 2G','13','48','UHD 4K (3840 x 2160)@30fps','5000','0','186','1','El celular Samsung Galaxy A33, en su color “Awesome Black” con acabado mate, brinda un estilo moderno y elegante que destaca del resto. Con su sensor de huellas dactilares incorporado en la pantalla, podrás iniciar sesión instantáneamente en tus aplicaciones y sitios web.','2023-04-19 19:01:22','2023-04-19 19:01:22'),(14,'Samsung S20 FE 5G 128GB Azul','1681935791811_products_.svg',1,210000,10,1,'S20 FE 5G 128GB','Android','6.5','128','6','Octa-Core 2.8GHz, 2.','32','12 + 12 + 8','UHD 8K (7680 x 4320) @60fps','4500','159.8 x 74.5 x 8.4','190','1000','Un smartphone que te da lo que querés para que puedas hacer más de lo que disfrutás, ese es el Galaxy S20 FE.','2023-04-19 19:10:10','2023-04-19 20:23:11'),(15,'Redmi Note 11 4GB','1681941928812_products_.png',3,101000,5,1,'Redmi Note 11','Android','6.43','128','4','Snapdragon® 680 ','13','50','1080p 1920 x 1080','5000','159,77 x 73,77 x 8,09','179','','El nuevo Redmi Note 11 se distingue por un diseño moderno con un marco plano y un carácter minimalista.','2023-04-19 19:48:35','2023-04-19 22:05:28'),(16,'Redmi Note 10 5G ','1681935929297_products_.svg',3,129000,20,1,'Xiaomi Redmi 10A','Android','6.5','128','4','MediaTek Dimensity 7','8','48','1080p 1920 x 1080','5000','0','190','','Desafía tus límites con laserie Redmi Note 10. De la Antártida al espacio, la serie Redmi Note está lista para conquistar el mundo. Nuestra actitud es desafiar y superar las expectativas una y otra vez. ¡Ahora es tu turno! Desafía tus límites y descubre de lo que es capaz.','2023-04-19 20:23:55','2023-04-19 20:25:29'),(22,'Auriculares inalámbricos JBL ','1681941135836_products_.svg',1,20000,3,1,'','','0','0','0','','0','0','','0','0','0','0','El mejor auricular, al mejor precio!','2023-04-19 21:52:15','2023-04-19 21:52:15');
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
  `categoriesID` int(11) DEFAULT NULL,
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
INSERT INTO `subcategories` VALUES (1,'News',NULL,NULL,NULL),(2,'Refubrishes',NULL,NULL,NULL);
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

-- Dump completed on 2023-04-19 19:41:14
