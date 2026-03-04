
const { createCreditoSchema } = require("./creditos.validation");
const service = require("./creditos.service");

async function create(req, res, next) {
  try {
    const validated = createCreditoSchema.parse(req.body);
    const credito = await service.createCredito(validated);
    res.status(201).json(credito);
    console.log("Entró al create");
    console.log(req.body);
  } catch (error) {
    next(error);
  }
}

async function findAll(req, res, next) {
  try {
    const creditos = await service.getCreditos(req.query);
    res.json(creditos);
  } catch (error) {
    next(error);
  }
}

module.exports = { create, findAll };