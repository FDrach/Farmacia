const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.js");

const medicamentosRoutes = require("./routes/medicamentosRoutes");
const ventasRoutes = require("./routes/ventasRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const comprasRoutes = require("./routes/comprasRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

connection.connect((error) => {
  if (error) {
    console.error("Error conectando a la base de datos:", error);
    return;
  }
  console.log("Conexión exitosa a la base de datos.");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "API ok" });
});

app.use("/api/medicamentos", medicamentosRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/compras", comprasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
