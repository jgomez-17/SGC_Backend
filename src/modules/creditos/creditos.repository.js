const { pool } = require("../../config/db");

async function create(data) {
  const query = `
    INSERT INTO creditos
    (nombre_cliente, identificacion, valor, tasa_interes, plazo_meses, comercial)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    data.nombreCliente,
    data.identificacion,
    data.valor,
    data.tasaInteres,
    data.plazoMeses,
    data.comercial,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function findAll(filters) {
  let query = `SELECT * FROM creditos WHERE 1=1`;
  const values = [];
  let index = 1;

  if (filters.nombre) {
    query += ` AND nombre_cliente ILIKE $${index++}`;
    values.push(`%${filters.nombre}%`);
  }

  if (filters.identificacion) {
    query += ` AND identificacion ILIKE $${index++}`;
    values.push(`%${filters.identificacion}%`);
  }

  if (filters.comercial) {
    query += ` AND comercial ILIKE $${index++}`;
    values.push(`%${filters.comercial}%`);
  }

  const sortField =
    filters.sort === "valor" ? "valor" : "fecha_registro";
  const order = filters.order === "asc" ? "ASC" : "DESC";

  query += ` ORDER BY ${sortField} ${order}`;

  const { rows } = await pool.query(query, values);
  return rows;
}

module.exports = { create, findAll };