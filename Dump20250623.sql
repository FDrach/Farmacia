-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: Farmacia
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Categorias`
--

DROP TABLE IF EXISTS `Categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categorias`
--

LOCK TABLES `Categorias` WRITE;
/*!40000 ALTER TABLE `Categorias` DISABLE KEYS */;
INSERT INTO `Categorias` VALUES (1,'Analgésicos'),(7,'Antialérgicos'),(2,'Antibióticos'),(3,'Antigripales'),(8,'Cuidado Ocular'),(5,'Dermatológicos'),(9,'Primeros Auxilios'),(10,'Salud Cardiovascular'),(6,'Salud Digestiva'),(4,'Vitaminas y Suplementos');
/*!40000 ALTER TABLE `Categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Clientes`
--

DROP TABLE IF EXISTS `Clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `id_obra_social` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  KEY `id_obra_social` (`id_obra_social`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clientes`
--

LOCK TABLES `Clientes` WRITE;
/*!40000 ALTER TABLE `Clientes` DISABLE KEYS */;
INSERT INTO `Clientes` VALUES (1,'Juan Pérez','30123456',1),(2,'María García','28765432',2),(3,'Carlos López','32987654',3),(4,'Ana Martínez','25111222',4),(5,'Luis Rodríguez','35333444',1),(6,'Laura Sánchez','22555666',5),(7,'Pedro Gómez','38777888',6),(8,'Sofía Fernández','29999000',7),(9,'Diego Torres','31234567',9),(10,'Elena Ramirez','27890123',8);
/*!40000 ALTER TABLE `Clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Compra_Medicamento`
--

DROP TABLE IF EXISTS `Compra_Medicamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Compra_Medicamento` (
  `id_compra` int NOT NULL,
  `id_medicamento_prov` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `precio_unitario_compra` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_compra`,`id_medicamento_prov`),
  KEY `id_medicamento_prov` (`id_medicamento_prov`),
  CONSTRAINT `Compra_Medicamento_ibfk_1` FOREIGN KEY (`id_compra`) REFERENCES `Compras` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Compra_Medicamento_ibfk_2` FOREIGN KEY (`id_medicamento_prov`) REFERENCES `MedicamentosProv` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Compra_Medicamento`
--

LOCK TABLES `Compra_Medicamento` WRITE;
/*!40000 ALTER TABLE `Compra_Medicamento` DISABLE KEYS */;
INSERT INTO `Compra_Medicamento` VALUES (1,1,100,80.00),(1,4,50,120.00),(1,12,50,240.00),(2,5,70,180.00),(3,3,100,250.00),(3,6,100,300.00),(4,7,100,450.00),(5,8,100,350.00),(6,9,100,280.00),(7,10,200,200.00),(8,11,100,220.00),(9,1,200,80.00),(10,12,1,240.00),(11,12,1,240.00);
/*!40000 ALTER TABLE `Compra_Medicamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Compras`
--

DROP TABLE IF EXISTS `Compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Compras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_proveedor` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `Total` decimal(12,2) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_proveedor` (`id_proveedor`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `Compras_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `Proveedores` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Compras_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Compras`
--

LOCK TABLES `Compras` WRITE;
/*!40000 ALTER TABLE `Compras` DISABLE KEYS */;
INSERT INTO `Compras` VALUES (1,1,1,24000.00,'2024-05-01 10:00:00'),(2,2,6,12600.00,'2024-05-02 11:00:00'),(3,3,1,55000.00,'2024-05-03 12:00:00'),(4,4,6,45000.00,'2024-05-04 13:00:00'),(5,5,1,35000.00,'2024-05-05 14:00:00'),(6,6,6,28000.00,'2024-05-06 15:00:00'),(7,7,1,40000.00,'2024-05-07 16:00:00'),(8,8,6,22000.00,'2024-05-08 17:00:00'),(9,1,1,16000.00,'2024-05-10 10:00:00'),(10,1,1,240.00,'2025-06-22 03:18:09'),(11,1,1,240.00,'2025-06-22 03:19:13');
/*!40000 ALTER TABLE `Compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Medicamento_Categoria`
--

DROP TABLE IF EXISTS `Medicamento_Categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Medicamento_Categoria` (
  `id_Medicamento` int NOT NULL,
  `id_Categoria` int NOT NULL,
  KEY `fk_id_Categoria_idx` (`id_Categoria`),
  KEY `fk_id_Medicamento_idx` (`id_Medicamento`),
  CONSTRAINT `fk_id_Categoria` FOREIGN KEY (`id_Categoria`) REFERENCES `Categorias` (`id`),
  CONSTRAINT `fk_id_Medicamento` FOREIGN KEY (`id_Medicamento`) REFERENCES `Medicamentos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medicamento_Categoria`
--

LOCK TABLES `Medicamento_Categoria` WRITE;
/*!40000 ALTER TABLE `Medicamento_Categoria` DISABLE KEYS */;
INSERT INTO `Medicamento_Categoria` VALUES (1,1),(4,7),(5,6),(6,4),(7,5),(7,9),(8,8),(10,3),(3,1),(3,3),(3,9),(2,2),(9,10),(12,4),(13,4);
/*!40000 ALTER TABLE `Medicamento_Categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Medicamentos`
--

DROP TABLE IF EXISTS `Medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Medicamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `Stock` int DEFAULT '0',
  `Venta_libre` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medicamentos`
--

LOCK TABLES `Medicamentos` WRITE;
/*!40000 ALTER TABLE `Medicamentos` DISABLE KEYS */;
INSERT INTO `Medicamentos` VALUES (1,'Paracetamol 500mg',150.00,295,1),(2,'Amoxicilina 250mg/5ml Susp.',450.00,150,0),(3,'Ibuprofeno 400mg',219.50,50,1),(4,'Loratadina 10mg',300.00,68,1),(5,'Omeprazol 20mg',550.75,97,0),(6,'Complejo Vitamínico B',750.00,99,1),(7,'Crema Cicatrizante Aloe Vera',620.20,99,1),(8,'Gotas Oftálmicas Lubricantes',480.00,99,1),(9,'Aspirina Prevent 100mg',380.00,198,0),(10,'Jarabe para la Tos Mucolítico',410.50,99,1),(12,'Nutrilon Premium+ 1',3900.00,20,1),(13,'Fortisip Compact 125 ml Nutrición Pack 4',9000.00,10,1);
/*!40000 ALTER TABLE `Medicamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MedicamentosProv`
--

DROP TABLE IF EXISTS `MedicamentosProv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MedicamentosProv` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_medicamento_base` int NOT NULL,
  `id_proveedor` int NOT NULL,
  `nombre_proveedor_articulo` varchar(255) DEFAULT NULL,
  `precio_compra` decimal(10,2) NOT NULL,
  `stock` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_medicamento_base` (`id_medicamento_base`,`id_proveedor`),
  KEY `id_proveedor` (`id_proveedor`),
  CONSTRAINT `MedicamentosProv_ibfk_1` FOREIGN KEY (`id_medicamento_base`) REFERENCES `Medicamentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `MedicamentosProv_ibfk_2` FOREIGN KEY (`id_proveedor`) REFERENCES `Proveedores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MedicamentosProv`
--

LOCK TABLES `MedicamentosProv` WRITE;
/*!40000 ALTER TABLE `MedicamentosProv` DISABLE KEYS */;
INSERT INTO `MedicamentosProv` VALUES (1,1,1,'Paracetamol DS 500mg',80.00,1000),(2,1,2,'Analgesil 500mg',85.00,800),(3,2,3,'AmoxiAndina Susp 250',250.00,500),(4,3,1,'Ibuprofeno DS 400mg',120.00,1200),(5,4,2,'AlerStop 10mg',180.00,700),(6,5,3,'GastroProtec Omeprazol',300.00,400),(7,6,4,'VitalComplex B',450.00,600),(8,7,5,'DermoCura Aloe',350.00,300),(9,8,6,'OcuFresh Gotas',280.00,900),(10,9,7,'CardioPrevent ASA 100',200.00,1000),(11,10,8,'TوسیFlex Jarabe',220.00,500),(12,2,1,'Amoxicilina Genérica DS 250',240.00,298),(13,3,7,'asd',50.00,1),(14,1,7,'pctmk',999.00,98);
/*!40000 ALTER TABLE `MedicamentosProv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Proveedores`
--

DROP TABLE IF EXISTS `Proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Proveedores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `cuil` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cuil` (`cuil`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Proveedores`
--

LOCK TABLES `Proveedores` WRITE;
/*!40000 ALTER TABLE `Proveedores` DISABLE KEYS */;
INSERT INTO `Proveedores` VALUES (1,'Droguería Del Sol S.A.','Av. Corrientes 1234, CABA','30-11223344-5'),(2,'FarmaDistribuciones Sur SRL','Calle Falsa 789, Córdoba','33-55667788-9'),(3,'Laboratorios Andinos S.A.C.I.F.I.A.','Ruta 9 Km 50, Salta','30-99001122-3'),(4,'Proveedor Médico Austral','San Martín 567, Ushuaia','34-12345678-0'),(5,'Central Farmacéutica S.A.','Belgrano 300, Rosario','30-87654321-0'),(6,'DistriSalud SRL','9 de Julio 1500, Mendoza','33-44332211-7'),(7,'BioFarma Argentina','Parque Industrial Pilar, Buenos Aires','30-66554433-2'),(8,'MedSupply Group','Av. Colón 800, Mar del Plata','30-77889900-1');
/*!40000 ALTER TABLE `Proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recetas`
--

DROP TABLE IF EXISTS `Recetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recetas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_medicamento` int NOT NULL,
  `id_cliente` int NOT NULL,
  `descuento` decimal(5,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `id_medicamento` (`id_medicamento`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `Recetas_ibfk_1` FOREIGN KEY (`id_medicamento`) REFERENCES `Medicamentos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Recetas_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `Clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recetas`
--

LOCK TABLES `Recetas` WRITE;
/*!40000 ALTER TABLE `Recetas` DISABLE KEYS */;
INSERT INTO `Recetas` VALUES (1,2,1,0.50),(2,5,2,0.40),(3,9,4,0.60),(4,2,5,0.40),(5,5,6,0.45),(6,7,3,0.00),(7,10,8,0.38),(8,9,10,0.50);
/*!40000 ALTER TABLE `Recetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `Horario` varchar(100) NOT NULL,
  `Sueldo` decimal(10,2) NOT NULL,
  `usuario` varchar(45) NOT NULL,
  `contrasena` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (1,'25000111','Admin Principal','Administrador','Completo',950000.00,'admin','admin123'),(2,'35111222','Laura Farmacéutica','Farmacéutico','Mañana',780000.00,'lfarma','farmaLau'),(3,'38222333','Carlos Cajero','Cajero','Tarde',650000.00,'ccajero','cajeroCar'),(4,'40333444','Ana Repositora','Repositor','Mañana',600000.00,'arepositora','repoAna'),(5,'32444555','Martín Farmacéutico Noche','Farmacéutico','Noche',820000.00,'mfarmaN','nocheFarma'),(6,'29555666','Sofía Administradora Jr','Administrador','Tarde',700000.00,'sadmin','adminSofi'),(7,'36666777','Lucas Cajero Finde','Cajero','Fines de Semana',450000.00,'lcajeroF','findeLu'),(8,'41777888','Valentina Atención Público','Atención al Cliente','Completo',680000.00,'vatencion','valeAten'),(9,'12345678','test','Administrador','Mañana',0.00,'test','12345678');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Venta_Medicamento`
--

DROP TABLE IF EXISTS `Venta_Medicamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Venta_Medicamento` (
  `id_venta` int NOT NULL,
  `id_medicamento` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `precio_unitario_venta` decimal(10,2) NOT NULL,
  `descuento_aplicado` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id_venta`,`id_medicamento`),
  KEY `id_medicamento` (`id_medicamento`),
  CONSTRAINT `Venta_Medicamento_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `Ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Venta_Medicamento_ibfk_2` FOREIGN KEY (`id_medicamento`) REFERENCES `Medicamentos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Venta_Medicamento`
--

LOCK TABLES `Venta_Medicamento` WRITE;
/*!40000 ALTER TABLE `Venta_Medicamento` DISABLE KEYS */;
INSERT INTO `Venta_Medicamento` VALUES (1,1,2,150.00,0.40),(1,2,1,450.00,0.50),(2,3,1,220.50,0.35),(2,5,1,550.75,0.40),(3,6,1,750.00,0.50),(3,9,2,380.00,0.60),(4,1,3,150.00,0.00),(5,2,1,450.00,0.40),(6,5,2,550.75,0.45),(6,8,1,480.00,0.45),(7,4,2,300.00,0.38),(7,10,1,410.50,0.38),(8,7,1,620.20,0.00),(9,4,1,300.00,0.00),(10,1,1,150.00,0.00),(10,3,7,219.50,0.00),(11,2,1,450.00,0.00),(12,7,1,620.20,0.00),(13,4,1,300.00,0.00),(14,4,1,300.00,0.00),(15,2,1,450.00,0.00),(16,1,1,150.00,0.00),(17,3,1,219.50,0.00),(18,10,1,410.50,0.00),(19,1,2,150.00,0.00),(19,3,1,219.50,0.00),(19,10,2,410.50,0.00);
/*!40000 ALTER TABLE `Venta_Medicamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ventas`
--

DROP TABLE IF EXISTS `Ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ventas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `Total` decimal(12,2) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `metodo_pago` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `Ventas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `Clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Ventas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ventas`
--

LOCK TABLES `Ventas` WRITE;
/*!40000 ALTER TABLE `Ventas` DISABLE KEYS */;
INSERT INTO `Ventas` VALUES (1,1,3,405.00,'2024-05-15 09:30:00','Tarjeta de Débito'),(2,2,3,473.78,'2024-05-15 10:15:00','Efectivo'),(3,4,7,679.00,'2024-05-16 14:00:00','Tarjeta de Crédito'),(4,NULL,3,450.00,'2024-05-17 18:00:00','Efectivo'),(5,5,2,270.00,'2024-05-18 11:00:00','OSDE Virtual'),(6,6,5,869.83,'2024-05-18 22:30:00','Transferencia'),(7,8,2,626.51,'2024-05-19 09:45:00','Efectivo'),(8,9,7,620.20,'2024-05-20 16:00:00','Mercado Pago'),(9,NULL,1,300.00,'2025-06-22 23:29:29','tarjeta'),(10,NULL,1,1686.50,'2025-06-22 23:30:21','tarjeta'),(11,NULL,1,450.00,'2025-06-22 23:34:03','tarjeta'),(12,NULL,1,620.20,'2025-06-22 23:37:21','efectivo'),(13,NULL,1,300.00,'2025-06-23 00:01:34','efectivo'),(14,NULL,1,300.00,'2025-06-23 00:02:05','tarjeta'),(15,NULL,1,450.00,'2025-06-23 00:04:10','efectivo'),(16,NULL,1,150.00,'2025-06-23 01:18:36','efectivo'),(17,NULL,1,219.50,'2025-06-23 01:18:58','efectivo'),(18,NULL,1,410.50,'2025-06-23 01:21:35','tarjeta'),(19,NULL,1,1340.50,'2025-06-23 01:40:10','efectivo');
/*!40000 ALTER TABLE `Ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obra_social`
--

DROP TABLE IF EXISTS `obra_social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obra_social` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descuento` decimal(5,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obra_social`
--

LOCK TABLES `obra_social` WRITE;
/*!40000 ALTER TABLE `obra_social` DISABLE KEYS */;
INSERT INTO `obra_social` VALUES (1,'OSDE',0.40),(2,'Swiss Medical',0.35),(3,'Galeno',0.30),(4,'PAMI',0.50),(5,'IOMA',0.45),(6,'OSECAC',0.25),(7,'Sancor Salud',0.33),(8,'Medifé',0.38),(9,'Particular (Sin Cobertura)',0.00),(10,'test',0.01),(12,'asdfgh',0.40);
/*!40000 ALTER TABLE `obra_social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vista_medicamentos_categorias`
--

DROP TABLE IF EXISTS `vista_medicamentos_categorias`;
/*!50001 DROP VIEW IF EXISTS `vista_medicamentos_categorias`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_medicamentos_categorias` AS SELECT 
 1 AS `id`,
 1 AS `Nombre`,
 1 AS `precio`,
 1 AS `Stock`,
 1 AS `Venta_libre`,
 1 AS `categorias`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vista_medicamentos_categorias`
--

/*!50001 DROP VIEW IF EXISTS `vista_medicamentos_categorias`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb3 */;
/*!50001 SET character_set_results     = utf8mb3 */;
/*!50001 SET collation_connection      = utf8mb3_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_medicamentos_categorias` AS select `m`.`id` AS `id`,`m`.`Nombre` AS `Nombre`,`m`.`precio` AS `precio`,`m`.`Stock` AS `Stock`,`m`.`Venta_libre` AS `Venta_libre`,coalesce(json_arrayagg(`c`.`nombre`),'[]') AS `categorias` from ((`Medicamentos` `m` left join `Medicamento_Categoria` `mc` on((`m`.`id` = `mc`.`id_Medicamento`))) left join `Categorias` `c` on((`mc`.`id_Categoria` = `c`.`id`))) group by `m`.`id` order by `m`.`Nombre` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-23  0:48:13
