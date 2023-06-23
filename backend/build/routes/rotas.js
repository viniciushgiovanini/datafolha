"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports packages
const exp = require("express");
const routes = exp();
// imports funcs
const connectbd_1 = require("../func/connectbd");
const addUser_1 = require("../func/auth/addUser");
const getUser_1 = require("../func/auth/getUser");
const pwdHashGenerator_1 = require("../func/pwdHashGenerator");
const addVoto_1 = require("../func/query_votacao/addVoto");
const getAllvotos_1 = require("../func/query_votacao/getAllvotos");
const markVoto_1 = require("../func/query_votacao/markVoto");
//Path das rotas
routes.get("/", (req, res) => {
    res.status(200);
    res.send({ resp: "Raiz da API do DataFolha" });
});
routes.get("/testCN", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection = yield (0, connectbd_1.connectToPG)()
        .then((res) => res)
        .catch((err) => err);
    setTimeout(() => {
        (0, connectbd_1.closeConnection)(connection);
    }, 10000);
    res.send("Conexão Feita e já Fechada");
}));
routes.post("/addUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection = yield (0, connectbd_1.connectToPG)()
        .then((res) => res)
        .catch((err) => err);
    if (req.body.password == "") {
        res.status(404);
        res.send({ resp: "Senha inválida" });
        return;
    }
    let hashpassword = yield (0, pwdHashGenerator_1.hashPWD)(req.body.password);
    let queryArray = [];
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
    let respostaPostUser = yield (0, addUser_1.adicionarUser)(connection, queryArray)
        .then((res) => res)
        .catch((err) => err);
    if (respostaPostUser) {
        res.status(200);
        res.send({ resp: "Usuário adicionado com sucesso !" });
    }
    else {
        res.status(404);
        res.send({ resp: "ERRO ao adicionar usuário !" });
    }
    setTimeout(() => {
        (0, connectbd_1.closeConnection)(connection);
    }, 10000);
}));
routes.get("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection = yield (0, connectbd_1.connectToPG)()
        .then((res) => res)
        .catch((err) => err);
    let queryArray = [];
    queryArray.push(req.query.email);
    let retResp = yield (0, getUser_1.requestUser)(connection, queryArray)
        .then((resp) => resp)
        .catch((err) => err);
    if (retResp != false) {
        let boolCompareHash = yield (0, pwdHashGenerator_1.compareHash)(retResp.user_password, req.query.password);
        if (boolCompareHash) {
            const newResp = {
                user_name: retResp.user_name,
                user_email: retResp.user_email,
                user_sexo: retResp.user_sexo,
                user_cpf: retResp.user_cpf,
                user_age: retResp.user_age,
            };
            res.status(200);
            res.send({ resp: newResp });
        }
        else {
            res.status(404);
            res.send({ resp: "Senha incorreta !" });
        }
    }
    else {
        res.status(404);
        res.send({ resp: "Email não existente !" });
    }
    setTimeout(() => {
        (0, connectbd_1.closeConnection)(connection);
    }, 10000);
}));
routes.post("/votar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection = yield (0, connectbd_1.connectToPG)()
        .then((res) => res)
        .catch((err) => err);
    let queryData = [];
    if (req.body.candidato.toLowerCase() == "lula") {
        queryData.push("luiz inacio lula da silva");
    }
    else if (req.body.candidato.toLowerCase() == "bolsonaro") {
        queryData.push("jair messias bolsonaro");
    }
    else {
        queryData.push(req.body.candidato);
    }
    let queryArray = [];
    queryArray.push(req.body.user_email);
    let takeUser = yield (0, getUser_1.requestUser)(connection, queryArray)
        .then((resp) => resp)
        .catch((err) => err);
    if (takeUser != false) {
        if (takeUser.votacao == false) {
            let pegarVoto = yield (0, addVoto_1.addVoto)(connection, queryData)
                .then((res) => res)
                .catch((err) => err);
            if (pegarVoto) {
                // res.status(200);
                res.send({ resp: "Voto realizado com sucesso !" });
            }
            else {
                // res.status(404);
                res.send({ resp: "Voto não computado !" });
            }
        }
        else {
            res.status(404);
            res.send({ resp: "Usuário já votou !" });
        }
    }
    setTimeout(() => {
        (0, connectbd_1.closeConnection)(connection);
    }, 10000);
}));
routes.get("/allvotos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection = yield (0, connectbd_1.connectToPG)()
        .then((res) => res)
        .catch((err) => err);
    let respAllData = yield (0, getAllvotos_1.getAllvotos)(connection)
        .then((resp) => resp)
        .catch((err) => err);
    if (respAllData == false) {
        res.status(404);
        res.send({ resp: "Erro na requisição !" });
    }
    else {
        res.status(200);
        res.send({ resp: respAllData });
    }
    setTimeout(() => {
        (0, connectbd_1.closeConnection)(connection);
    }, 10000);
}));
routes.put("/marcarVoto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection = yield (0, connectbd_1.connectToPG)()
        .then((res) => res)
        .catch((err) => err);
    let userEmail = req.body.user_email;
    let queryData = [];
    queryData.push(userEmail);
    let requestUS = yield (0, getUser_1.requestUser)(connection, queryData)
        .then((resp) => resp)
        .catch((err) => err);
    if (requestUS != false) {
        let respRequestMark = yield (0, markVoto_1.markVoto)(connection, queryData)
            .then((suc) => suc)
            .catch((err) => err);
        if (respRequestMark) {
            res.status(200);
            res.send({ resp: "Usuario marcado como votado !" });
        }
        else {
            res.status(404);
            res.send({ resp: "Erro na request para marcar voto" });
        }
    }
    else {
        res.status(404);
        res.send({ resp: "Erro na request de user para marcar voto" });
    }
    setTimeout(() => {
        (0, connectbd_1.closeConnection)(connection);
    }, 10000);
}));
//export solo
module.exports = routes;
//# sourceMappingURL=rotas.js.map