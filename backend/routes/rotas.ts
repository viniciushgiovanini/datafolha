//imports packages
const exp: any = require("express");
const routes = exp();

// imports funcs
import { connectToPG, closeConnection } from "../func/connectbd";
import { adicionarUser } from "../func/auth/addUser";
import { requestUser } from "../func/auth/getUser";
import { hashPWD, compareHash } from "../func/pwdHashGenerator";
import { addVoto } from "../func/query_votacao/addVoto";
import { getAllvotos } from "../func/query_votacao/getAllvotos";
import { markVoto } from "../func/query_votacao/markVoto";

const validate = (): any => {};

//Path das rotas
routes.get("/", (req: any, res: any) => {
  res.status(200);
  res.send({ resp: "Raiz da API do DataFolha" });
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

  if (req.body.password == "") {
    res.status(404);
    res.send({ resp: "Senha inválida" });
    return;
  }

  let hashpassword: string = await hashPWD(req.body.password);
  let queryArray: string[] = [];
  queryArray.push(req.body.nome);
  queryArray.push(req.body.email);
  queryArray.push(hashpassword);
  queryArray.push(req.body.age);
  queryArray.push(req.body.cpf);
  queryArray.push(req.body.sexo);

  if (req.body.age < 16) {
    res.status(404);
    res.send({ resp: "Usuário não adicionado, menor de idade !" });
    return;
  }

  let respostaPostUser: boolean = await adicionarUser(connection, queryArray)
    .then((res: any) => res)
    .catch((err: any) => err);

  if (respostaPostUser) {
    res.status(200);
    res.send({ resp: "Usuário adicionado com sucesso !" });
  } else {
    res.status(404);
    res.send({ resp: "ERRO ao adicionar usuário !" });
  }

  setTimeout(() => {
    closeConnection(connection);
  }, 10000);
});

routes.get("/login", async (req: any, res: any): Promise<any> => {
  let connection: any = await connectToPG()
    .then((res: any) => res)
    .catch((err: any) => err);

  let queryArray: string[] = [];

  queryArray.push(req.query.email);

  let retResp: any = await requestUser(connection, queryArray)
    .then((resp: any) => resp)
    .catch((err: any) => err);

  if (retResp != false) {
    let boolCompareHash: boolean = await compareHash(
      retResp.user_password,
      req.query.password
    );

    if (boolCompareHash) {
      const newResp: object = {
        user_name: retResp.user_name,
        user_email: retResp.user_email,
        user_sexo: retResp.user_sexo,
        user_cpf: retResp.user_cpf,
        user_age: retResp.user_age,
      };

      res.status(200);
      res.send({ resp: newResp });
    } else {
      res.status(404);
      res.send({ resp: "Senha incorreta !" });
    }
  } else {
    res.status(404);
    res.send({ resp: "Email não existente !" });
  }

  setTimeout(() => {
    closeConnection(connection);
  }, 10000);
});

routes.post("/votar", async (req: any, res: any): Promise<any> => {
  let connection: any = await connectToPG()
    .then((res: any) => res)
    .catch((err: any) => err);

  let queryData: string[] = [];

  if (req.body.candidato.toLowerCase() == "lula") {
    queryData.push("luiz inacio lula da silva");
  } else if (req.body.candidato.toLowerCase() == "bolsonaro") {
    queryData.push("jair messias bolsonaro");
  } else {
    queryData.push(req.body.candidato);
  }

  let queryArray: string[] = [];
  queryArray.push(req.body.user_email);

  let takeUser: any = await requestUser(connection, queryArray)
    .then((resp: object) => resp)
    .catch((err: boolean) => err);

  if (takeUser != false) {
    if (takeUser.votacao == false) {
      let pegarVoto = await addVoto(connection, queryData)
        .then((res: any) => res)
        .catch((err: any) => err);

      if (pegarVoto) {
        // res.status(200);
        res.send({ resp: "Voto realizado com sucesso !" });
      } else {
        // res.status(404);
        res.send({ resp: "Voto não computado !" });
      }
    } else {
      res.status(404);
      res.send({ resp: "Usuário já votou !" });
    }
  }
  setTimeout(() => {
    closeConnection(connection);
  }, 10000);
});

routes.get("/allvotos", async (req: any, res: any): Promise<any> => {
  let connection: any = await connectToPG()
    .then((res: any) => res)
    .catch((err: any) => err);

  let respAllData: any = await getAllvotos(connection)
    .then((resp: object) => resp)
    .catch((err: boolean) => err);

  if (respAllData == false) {
    res.status(404);
    res.send({ resp: "Erro na requisição !" });
  } else {
    res.status(200);
    res.send({ resp: respAllData });
  }
  setTimeout(() => {
    closeConnection(connection);
  }, 10000);
});

routes.put("/marcarVoto", async (req: any, res: any): Promise<any> => {
  let connection: any = await connectToPG()
    .then((res: any) => res)
    .catch((err: any) => err);

  let userEmail = req.body.user_email;

  let queryData: string[] = [];
  queryData.push(userEmail);

  let requestUS: any = await requestUser(connection, queryData)
    .then((resp: object) => resp)
    .catch((err: boolean) => err);

  if (requestUS != false) {
    let respRequestMark = await markVoto(connection, queryData)
      .then((suc: boolean) => suc)
      .catch((err: boolean) => err);

    if (respRequestMark) {
      res.status(200);
      res.send({ resp: "Usuario marcado como votado !" });
    } else {
      res.status(404);
      res.send({ resp: "Erro na request para marcar voto" });
    }
  } else {
    res.status(404);
    res.send({ resp: "Erro na request de user para marcar voto" });
  }

  setTimeout(() => {
    closeConnection(connection);
  }, 10000);
});

//export solo
module.exports = routes;
