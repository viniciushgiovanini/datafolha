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

//tratando cors
app.use(function (req: any, res: any, next: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// routes
const rotas: any = require("./routes/rotas");
app.use(rotas);

console.log(`Backend do datafolha ligado na porta ${port} !`);
app.listen(port);
