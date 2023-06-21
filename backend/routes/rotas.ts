//imports packages
const exp: any = require("express");
const routes = exp();

// imports funcs
import { connectToPG, closeConnection } from "../func/connectbd";
import { adicionarUser } from "../func/auth/addUser";
import { requestUser } from "../func/auth/getUser";
import { hashPWD, compareHash } from "../func/pwdHashGenerator";

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

  let hashpassword: string = await hashPWD(req.body.password);

  let queryArray: string[] = [];
  queryArray.push(req.body.nome);
  queryArray.push(req.body.email);
  queryArray.push(hashpassword);
  queryArray.push(req.body.age);
  queryArray.push(req.body.cpf);
  queryArray.push(req.body.sexo);

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

routes.get("/login", async (req: any, res: any): Promise<any> => {
  let connection: any = await connectToPG()
    .then((res: any) => res)
    .catch((err: any) => err);

  let hashpassword = await hashPWD(req.body.password);
  let queryArray: string[] = [];

  queryArray.push(req.body.email);

  let retResp: any = await requestUser(connection, queryArray)
    .then((resp: any) => resp)
    .catch((err: any) => err);

  if (retResp != false) {
    let boolCompareHash: boolean = await compareHash(
      retResp.user_password,
      req.body.password
    );

    if (boolCompareHash) {
      const newResp: object = {
        user_name: retResp.user_name,
        user_email: retResp.user_email,
        user_sexo: retResp.user_sexo,
        user_cpf: retResp.user_cpf,
        user_age: retResp.user_age,
      };

      res.send({ resp: newResp });
    } else {
      res.send({ resp: "Usuário não encontrado !" });
    }
  } else {
    res.send({ resp: "Usuário não encontrado !" });
  }

  setTimeout(() => {
    closeConnection(connection);
  }, 10000);
});
//export solo
module.exports = routes;
