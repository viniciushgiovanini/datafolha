"use strict";
//importando dotenv
require("dotenv").config();
//configs gerais do express
const express = require("express");
const app = express();
const port = parseInt(process.env.PORT);
//ativando express
app.use(express.json());
//tratando cors
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
// routes
const rotas = require("./routes/rotas");
app.use(rotas);
console.log(`Backend do datafolha ligado na porta ${port} !`);
app.listen(port);
//# sourceMappingURL=app.js.map