const { z } = require("zod");

const createCreditoSchema = z.object({
  nombreCliente: z.string().min(3),
  identificacion: z.string().min(5),
  valor: z.number().positive(),
  tasaInteres: z.number().positive(),
  plazoMeses: z.number().int().positive(),
  comercial: z.string().min(3),
});

module.exports = { createCreditoSchema };