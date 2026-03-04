const express = require("express");
const router = express.Router();
const controller = require("./creditos.controller");

router.post("/", controller.create);
router.get("/", controller.findAll);

module.exports = router;