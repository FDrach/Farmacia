-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: Farmacia
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categorias`
--

LOCK TABLES `Categorias` WRITE;
/*!40000 ALTER TABLE `Categorias` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clientes`
--

LOCK TABLES `Clientes` WRITE;
/*!40000 ALTER TABLE `Clientes` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Compras`
--

LOCK TABLES `Compras` WRITE;
/*!40000 ALTER TABLE `Compras` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medicamentos`
--

LOCK TABLES `Medicamentos` WRITE;
/*!40000 ALTER TABLE `Medicamentos` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MedicamentosProv`
--

LOCK TABLES `MedicamentosProv` WRITE;
/*!40000 ALTER TABLE `MedicamentosProv` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Proveedores`
--

LOCK TABLES `Proveedores` WRITE;
/*!40000 ALTER TABLE `Proveedores` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recetas`
--

LOCK TABLES `Recetas` WRITE;
/*!40000 ALTER TABLE `Recetas` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ventas`
--

LOCK TABLES `Ventas` WRITE;
/*!40000 ALTER TABLE `Ventas` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obra_social`
--

LOCK TABLES `obra_social` WRITE;
/*!40000 ALTER TABLE `obra_social` DISABLE KEYS */;
/*!40000 ALTER TABLE `obra_social` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-03 11:04:22
