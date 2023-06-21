//imports packages
const exp: any = require("express");
const routes = exp();

// imports funcs
import { connectToPG, closeConnection } from "../func/connectbd";
import { adicionarUser } from "../func/auth/addUser";
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

routes.post("/addUser", async (req: any, res: any): Promise<any> => {
  let connection: any = await connectToPG()
    .then((res: any) => res)
    .catch((err: any) => err);

  let queryArray: string[] = [];
  queryArray.push(req.body.nome);
  queryArray.push(req.body.email);
  queryArray.push(req.body.password);
  queryArray.push(req.body.age);

  let respostaPostUser: boolean = await adicionarUser(connection, queryArray)
    .then((res: any) => res)
    .catch((err: any) => err);

  if (respostaPostUser) {
    res.send("Usuário adicionado com sucesso !");
  } else {
    res.send("ERRO ao adicionar usuário !");
  }

  setTimeout(() => {
    closeConnection(connection);
  }, 10000);
});
//export solo
module.exports = routes;
