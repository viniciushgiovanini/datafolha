//imports packages
const exp: any = require("express");
const routes = exp();

// imports funcs
import { connectToPG, closeConnection } from "../func/connectbd";

//Path das rotas
routes.get("/", (req: any, res: any) => {
  res.send("Raiz da API do DataFolha");
});

routes.get("/testCN", async (req: any, res: any): Promise<void> => {
  let connection: any = await connectToPG()
    .then((res: any) => res)
    .catch((err: any) => err);

  setTimeout(() => {
    closeConnection(connection);
  }, 10000);

  res.send("Conexão Feita e já Fechada");
});

//export solo
module.exports = routes;
