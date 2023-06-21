// declarando require e module e process
declare var module: any;
declare var require: any;
declare var process: any;

//importando dotenv
require("dotenv").config();

//configs gerais do express
const express: any = require("express");
const app: any = express();
const port: number = parseInt(process.env.PORT!);

//ativando express
app.use(express.json());

// routes
const rotas: any = require("./routes/rotas");
app.use(rotas);

console.log(`Backend do datafolha ligado na porta ${port} !`);
app.listen(port);
