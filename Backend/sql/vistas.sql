CREATE VIEW vista_medicamentos_categorias AS
  SELECT
    m.id,
    m.Nombre,
    m.precio,
    m.Stock,
    m.Venta_libre,
    COALESCE(JSON_ARRAYAGG(c.nombre), '[]') AS categorias
  FROM
    Medicamentos m
    LEFT JOIN Medicamento_Categoria mc ON m.id = mc.id_Medicamento
    LEFT JOIN Categorias c ON mc.id_Categoria = c.id
  GROUP BY
    m.id
  ORDER BY
    m.Nombre;


DROP PROCEDURE IF EXISTS get_medicamentos_by_id;

DELIMITER //

CREATE PROCEDURE get_medicamentos_by_id(IN p_id INT)
BEGIN
  SELECT
    m.id,
    m.Nombre,
    m.precio,
    m.Stock,
    m.Venta_libre,
    COALESCE(JSON_ARRAYAGG(c.nombre), '[]') AS categorias
  FROM
    Medicamentos m
    LEFT JOIN Medicamento_Categoria mc ON m.id = mc.id_Medicamento
    LEFT JOIN Categorias c ON mc.id_Categoria = c.id
  WHERE
    m.id = p_id
  GROUP BY
    m.id;
END//

DELIMITER ;