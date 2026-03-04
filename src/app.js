const express = require("express");
const cors = require("cors");
const creditosRoutes = require("./modules/creditos/creditos.route");
const errorHandler = require("./shared/middleware/error.middleware");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/creditos", creditosRoutes);
app.use((err, req, res, next) => {
  console.error("Error global:", err);

  if (err.name === "ZodError") {
    return res.status(400).json({
      message: "Error de validación",
      errors: err.errors,
    });
  }

  res.status(500).json({
    message: "Error interno del servidor",
  });
});
app.use(errorHandler);

module.exports = app;