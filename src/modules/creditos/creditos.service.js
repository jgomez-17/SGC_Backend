const { pool } = require("../../config/db"); // <-- importante
const repository = require("./creditos.repository");
const emailJob = require("../../shared/jobs/email.job");

async function createCredito(data) {
  const credito = await repository.create(data);

  setImmediate(() => {
    emailJob.enviarNuevoCredito(credito);
  });

  return credito;
}

async function getCreditos({ filtro, ordenCampo = "id", ordenTipo = "desc" }) {
  let query = "SELECT * FROM creditos";
  const values = [];
  const conditions = [];

  if (filtro) {
    values.push(`%${filtro}%`);
    conditions.push(`"nombre_cliente" ILIKE $${values.length}`);
    conditions.push(`identificacion ILIKE $${values.length}`);
    conditions.push(`comercial ILIKE $${values.length}`);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" OR ");
  }

  // ⚠️ Validación de ordenamiento
  const camposPermitidos = ["id", "fecha_registro", "valor"];
  const tiposPermitidos = ["asc", "desc"];

  const campo = camposPermitidos.includes(ordenCampo) ? ordenCampo : "id";
  const tipo = tiposPermitidos.includes(ordenTipo.toLowerCase()) ? ordenTipo.toLowerCase() : "desc";

  query += ` ORDER BY ${campo} ${tipo}`;

  const { rows } = await pool.query(query, values);
  return rows;
}

module.exports = { createCredito, getCreditos };