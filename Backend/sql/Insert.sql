use Farmacia;

INSERT INTO `Categorias` (`id`, `nombre`) VALUES
(1, 'Analgésicos'),
(2, 'Antibióticos'),
(3, 'Antigripales'),
(4, 'Vitaminas y Suplementos'),
(5, 'Dermatológicos'),
(6, 'Salud Digestiva'),
(7, 'Antialérgicos'),
(8, 'Cuidado Ocular'),
(9, 'Primeros Auxilios'),
(10, 'Salud Cardiovascular');

INSERT INTO `obra_social` (`id`, `nombre`, `descuento`) VALUES
(1, 'OSDE', 0.40),
(2, 'Swiss Medical', 0.35),
(3, 'Galeno', 0.30),
(4, 'PAMI', 0.50),
(5, 'IOMA', 0.45),
(6, 'OSECAC', 0.25),
(7, 'Sancor Salud', 0.33),
(8, 'Medifé', 0.38),
(9, 'Particular (Sin Cobertura)', 0.00);

INSERT INTO `Clientes` (`id`, `Nombre`, `dni`, `id_obra_social`) VALUES
(1, 'Juan Pérez', '30123456', 1),
(2, 'María García', '28765432', 2),
(3, 'Carlos López', '32987654', 3),
(4, 'Ana Martínez', '25111222', 4),
(5, 'Luis Rodríguez', '35333444', 1),
(6, 'Laura Sánchez', '22555666', 5),
(7, 'Pedro Gómez', '38777888', 6),
(8, 'Sofía Fernández', '29999000', 7),
(9, 'Diego Torres', '31234567', 9),
(10, 'Elena Ramirez', '27890123', 8);

INSERT INTO `Medicamentos` (`id`, `Nombre`, `precio`, `Stock`, `Venta_libre`) VALUES
(1, 'Paracetamol 500mg', 150.00, 0, 1), 
(2, 'Amoxicilina 250mg/5ml Susp.', 450.00, 0, 0),
(3, 'Ibuprofeno 400mg', 220.50, 0, 1),
(4, 'Loratadina 10mg', 300.00, 0, 1),
(5, 'Omeprazol 20mg', 550.75, 0, 0),
(6, 'Complejo Vitamínico B', 750.00, 0, 1),
(7, 'Crema Cicatrizante Aloe Vera', 620.20, 0, 1),
(8, 'Gotas Oftálmicas Lubricantes', 480.00, 0, 1),
(9, 'Aspirina Prevent 100mg', 380.00, 0, 0),
(10, 'Jarabe para la Tos Mucolítico', 410.50, 0, 1);

INSERT INTO `Proveedores` (`id`, `nombre`, `direccion`, `cuil`) VALUES
(1, 'Droguería Del Sol S.A.', 'Av. Corrientes 1234, CABA', '30-11223344-5'),
(2, 'FarmaDistribuciones Sur SRL', 'Calle Falsa 789, Córdoba', '33-55667788-9'),
(3, 'Laboratorios Andinos S.A.C.I.F.I.A.', 'Ruta 9 Km 50, Salta', '30-99001122-3'),
(4, 'Proveedor Médico Austral', 'San Martín 567, Ushuaia', '34-12345678-0'),
(5, 'Central Farmacéutica S.A.', 'Belgrano 300, Rosario', '30-87654321-0'),
(6, 'DistriSalud SRL', '9 de Julio 1500, Mendoza', '33-44332211-7'),
(7, 'BioFarma Argentina', 'Parque Industrial Pilar, Buenos Aires', '30-66554433-2'),
(8, 'MedSupply Group', 'Av. Colón 800, Mar del Plata', '30-77889900-1');

INSERT INTO `Usuarios` (`id`, `dni`, `nombre`, `tipo`, `Horario`, `Sueldo`, `usuario`, `contrasena`) VALUES
(1, '25000111', 'Admin Principal', 'Administrador', 'Completo', 950000.00, 'admin', 'admin123'),
(2, '35111222', 'Laura Farmacéutica', 'Farmacéutico', 'Mañana', 780000.00, 'lfarma', 'farmaLau'),
(3, '38222333', 'Carlos Cajero', 'Cajero', 'Tarde', 650000.00, 'ccajero', 'cajeroCar'),
(4, '40333444', 'Ana Repositora', 'Repositor', 'Mañana', 600000.00, 'arepositora', 'repoAna'),
(5, '32444555', 'Martín Farmacéutico Noche', 'Farmacéutico', 'Noche', 820000.00, 'mfarmaN', 'nocheFarma'),
(6, '29555666', 'Sofía Administradora Jr', 'Administrador', 'Tarde', 700000.00, 'sadmin', 'adminSofi'),
(7, '36666777', 'Lucas Cajero Finde', 'Cajero', 'Fines de Semana', 450000.00, 'lcajeroF', 'findeLu'),
(8, '41777888', 'Valentina Atención Público', 'Atención al Cliente', 'Completo', 680000.00, 'vatencion', 'valeAten');

INSERT INTO `MedicamentosProv` (`id`, `id_medicamento_base`, `id_proveedor`, `nombre_proveedor_articulo`, `precio_compra`, `stock`) VALUES
(1, 1, 1, 'Paracetamol DS 500mg', 80.00, 1000),
(2, 1, 2, 'Analgesil 500mg', 85.00, 800),
(3, 2, 3, 'AmoxiAndina Susp 250', 250.00, 500),
(4, 3, 1, 'Ibuprofeno DS 400mg', 120.00, 1200),
(5, 4, 2, 'AlerStop 10mg', 180.00, 700),
(6, 5, 3, 'GastroProtec Omeprazol', 300.00, 400),
(7, 6, 4, 'VitalComplex B', 450.00, 600),
(8, 7, 5, 'DermoCura Aloe', 350.00, 300),
(9, 8, 6, 'OcuFresh Gotas', 280.00, 900),
(10, 9, 7, 'CardioPrevent ASA 100', 200.00, 1000),
(11, 10, 8, 'TوسیFlex Jarabe', 220.00, 500),
(12, 2, 1, 'Amoxicilina Genérica DS 250', 240.00, 300); 

INSERT INTO `Compras` (`id`, `id_proveedor`, `id_usuario`, `Total`, `fecha`) VALUES
(1, 1, 1, 24000.00, '2024-05-01 10:00:00'), 
(2, 2, 6, 12600.00, '2024-05-02 11:00:00'), 
(3, 3, 1, 75000.00, '2024-05-03 12:00:00'), 
(4, 4, 6, 45000.00, '2024-05-04 13:00:00'), 
(5, 5, 1, 35000.00, '2024-05-05 14:00:00'), 
(6, 6, 6, 28000.00, '2024-05-06 15:00:00'), 
(7, 7, 1, 40000.00, '2024-05-07 16:00:00'), 
(8, 8, 6, 22000.00, '2024-05-08 17:00:00'), 
(9, 1, 1, 16000.00, '2024-05-10 10:00:00'); 

UPDATE `Compras` SET `Total` = 55000.00 WHERE `id` = 3;

INSERT INTO `Compra_Medicamento` (`id_compra`, `id_medicamento_prov`, `cantidad`, `precio_unitario_compra`) VALUES
(1, 1, 100, 80.00),  
(1, 4, 50, 120.00), 
(1, 12, 50, 240.00); 

INSERT INTO `Compra_Medicamento` (`id_compra`, `id_medicamento_prov`, `cantidad`, `precio_unitario_compra`) VALUES
(2, 5, 70, 180.00);  

INSERT INTO `Compra_Medicamento` (`id_compra`, `id_medicamento_prov`, `cantidad`, `precio_unitario_compra`) VALUES
(3, 3, 100, 250.00), 
(3, 6, 100, 300.00); 

INSERT INTO `Compra_Medicamento` (`id_compra`, `id_medicamento_prov`, `cantidad`, `precio_unitario_compra`) VALUES
(4, 7, 100, 450.00); 

INSERT INTO `Compra_Medicamento` (`id_compra`, `id_medicamento_prov`, `cantidad`, `precio_unitario_compra`) VALUES
(5, 8, 100, 350.00); 

INSERT INTO `Compra_Medicamento` (`id_compra`, `id_medicamento_prov`, `cantidad`, `precio_unitario_compra`) VALUES
(6, 9, 100, 280.00); 

INSERT INTO `Compra_Medicamento` (`id_compra`, `id_medicamento_prov`, `cantidad`, `precio_unitario_compra`) VALUES
(7, 10, 200, 200.00);

INSERT INTO `Compra_Medicamento` (`id_compra`, `id_medicamento_prov`, `cantidad`, `precio_unitario_compra`) VALUES
(8, 11, 100, 220.00);

INSERT INTO `Compra_Medicamento` (`id_compra`, `id_medicamento_prov`, `cantidad`, `precio_unitario_compra`) VALUES
(9, 1, 200, 80.00);  

UPDATE Medicamentos SET Stock = Stock + 100 WHERE id = 1; 
UPDATE Medicamentos SET Stock = Stock + 50 WHERE id = 3;  
UPDATE Medicamentos SET Stock = Stock + 50 WHERE id = 2;  
UPDATE Medicamentos SET Stock = Stock + 70 WHERE id = 4;  
UPDATE Medicamentos SET Stock = Stock + 100 WHERE id = 2; 
UPDATE Medicamentos SET Stock = Stock + 100 WHERE id = 5; 
UPDATE Medicamentos SET Stock = Stock + 100 WHERE id = 6; 
UPDATE Medicamentos SET Stock = Stock + 100 WHERE id = 7; 
UPDATE Medicamentos SET Stock = Stock + 100 WHERE id = 8; 
UPDATE Medicamentos SET Stock = Stock + 200 WHERE id = 9; 
UPDATE Medicamentos SET Stock = Stock + 100 WHERE id = 10;
UPDATE Medicamentos SET Stock = Stock + 200 WHERE id = 1; 

INSERT INTO `Medicamento_Categoria` (`id_Medicamento`, `id_Categoria`) VALUES
(1, 1), 
(2, 2), 
(3, 1), 
(3, 3), 
(4, 7), 
(5, 6), 
(6, 4), 
(7, 5), 
(7, 9), 
(8, 8), 
(9, 10),
(10, 3);

INSERT INTO `Recetas` (`id`, `id_medicamento`, `id_cliente`, `descuento`) VALUES
(1, 2, 1, 0.50), 
(2, 5, 2, 0.40), 
(3, 9, 4, 0.60), 
(4, 2, 5, 0.40), 
(5, 5, 6, 0.45), 
(6, 7, 3, 0.00), 
(7, 10, 8, 0.38),
(8, 9, 10, 0.50);

INSERT INTO `Ventas` (`id`, `id_cliente`, `id_usuario`, `Total`, `fecha`, `metodo_pago`) VALUES
(1, 1, 3, 0.00, '2024-05-15 09:30:00', 'Tarjeta de Débito'), 
(2, 2, 3, 0.00, '2024-05-15 10:15:00', 'Efectivo'),          
(3, 4, 7, 0.00, '2024-05-16 14:00:00', 'Tarjeta de Crédito'),
(4, NULL, 3, 0.00, '2024-05-17 18:00:00', 'Efectivo'),      
(5, 5, 2, 0.00, '2024-05-18 11:00:00', 'OSDE Virtual'),    
(6, 6, 5, 0.00, '2024-05-18 22:30:00', 'Transferencia'),   
(7, 8, 2, 0.00, '2024-05-19 09:45:00', 'Efectivo'),          
(8, 9, 7, 0.00, '2024-05-20 16:00:00', 'Mercado Pago');     

INSERT INTO `Venta_Medicamento` (`id_venta`, `id_medicamento`, `cantidad`, `precio_unitario_venta`, `descuento_aplicado`) VALUES
(1, 1, 2, 150.00, 0.40), 
(1, 2, 1, 450.00, 0.50); 

UPDATE `Ventas` SET `Total` = 405.00 WHERE `id` = 1;
UPDATE `Medicamentos` SET `Stock` = `Stock` - 2 WHERE `id` = 1;
UPDATE `Medicamentos` SET `Stock` = `Stock` - 1 WHERE `id` = 2;

INSERT INTO `Venta_Medicamento` (`id_venta`, `id_medicamento`, `cantidad`, `precio_unitario_venta`, `descuento_aplicado`) VALUES
(2, 5, 1, 550.75, 0.40), 
(2, 3, 1, 220.50, 0.35); 

UPDATE `Ventas` SET `Total` = 473.78 WHERE `id` = 2;
UPDATE `Medicamentos` SET `Stock` = `Stock` - 1 WHERE `id` = 5;
UPDATE `Medicamentos` SET `Stock` = `Stock` - 1 WHERE `id` = 3;

INSERT INTO `Venta_Medicamento` (`id_venta`, `id_medicamento`, `cantidad`, `precio_unitario_venta`, `descuento_aplicado`) VALUES
(3, 9, 2, 380.00, 0.60), 
(3, 6, 1, 750.00, 0.50); 

UPDATE `Ventas` SET `Total` = 679.00 WHERE `id` = 3;
UPDATE `Medicamentos` SET `Stock` = `Stock` - 2 WHERE `id` = 9;
UPDATE `Medicamentos` SET `Stock` = `Stock` - 1 WHERE `id` = 6;

INSERT INTO `Venta_Medicamento` (`id_venta`, `id_medicamento`, `cantidad`, `precio_unitario_venta`, `descuento_aplicado`) VALUES
(4, 1, 3, 150.00, 0.00); 

UPDATE `Ventas` SET `Total` = 450.00 WHERE `id` = 4;
UPDATE `Medicamentos` SET `Stock` = `Stock` - 3 WHERE `id` = 1;

INSERT INTO `Venta_Medicamento` (`id_venta`, `id_medicamento`, `cantidad`, `precio_unitario_venta`, `descuento_aplicado`) VALUES
(5, 2, 1, 450.00, 0.40); 

UPDATE `Ventas` SET `Total` = 270.00 WHERE `id` = 5;
UPDATE `Medicamentos` SET `Stock` = `Stock` - 1 WHERE `id` = 2;

INSERT INTO `Venta_Medicamento` (`id_venta`, `id_medicamento`, `cantidad`, `precio_unitario_venta`, `descuento_aplicado`) VALUES
(6, 5, 2, 550.75, 0.45), 
(6, 8, 1, 480.00, 0.45); 

UPDATE `Ventas` SET `Total` = 869.83 WHERE `id` = 6;
UPDATE `Medicamentos` SET `Stock` = `Stock` - 2 WHERE `id` = 5;
UPDATE `Medicamentos` SET `Stock` = `Stock` - 1 WHERE `id` = 8;

INSERT INTO `Venta_Medicamento` (`id_venta`, `id_medicamento`, `cantidad`, `precio_unitario_venta`, `descuento_aplicado`) VALUES
(7, 10, 1, 410.50, 0.38),
(7, 4, 2, 300.00, 0.38); 

UPDATE `Ventas` SET `Total` = 626.51 WHERE `id` = 7;
UPDATE `Medicamentos` SET `Stock` = `Stock` - 1 WHERE `id` = 10;
UPDATE `Medicamentos` SET `Stock` = `Stock` - 2 WHERE `id` = 4;

INSERT INTO `Venta_Medicamento` (`id_venta`, `id_medicamento`, `cantidad`, `precio_unitario_venta`, `descuento_aplicado`) VALUES
(8, 7, 1, 620.20, 0.00); 

UPDATE `Ventas` SET `Total` = 620.20 WHERE `id` = 8;
UPDATE `Medicamentos` SET `Stock` = `Stock` - 1 WHERE `id` = 7;
