"use strict";
//importando dotenv
require("dotenv").config();
//configs gerais do express
const express = require("express");
const app = express();
const port = parseInt(process.env.PORT);
//ativando express
app.use(express.json());
// routes
const rotas = require("./routes/rotas");
app.use(rotas);
console.log(`Backend do datafolha ligado na porta ${port} !`);
app.listen(port);
//# sourceMappingURL=app.js.map