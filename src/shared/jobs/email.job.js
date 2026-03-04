const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  family: 4
});

async function enviarNuevoCredito(credito) {
  try {
    console.log("Intentando enviar correo...");
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_DESTINO,
      subject: "Nuevo crédito registrado",
      html: `
        <h3>Nuevo crédito registrado</h3>
        <p><strong>Cliente:</strong> ${credito.nombre_cliente}</p>
        <p><strong>Valor:</strong> ${credito.valor}</p>
        <p><strong>Comercial:</strong> ${credito.comercial}</p>
        <p><strong>Fecha:</strong> ${credito.fecha_registro}</p>
      `,
    });
  } catch (error) {
    console.error("Error enviando correo:", error.message);
  }
}

module.exports = { enviarNuevoCredito };