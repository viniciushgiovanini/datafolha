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
exports.closeConnection = exports.connectToPG = void 0;
//imports
const { Client } = require("pg");
require("dotenv").config({ path: ".././.env" });
const connectToPG = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
    });
    yield client.connect((err) => {
        if (err) {
            console.log(`Erro na Conexão`, err.stack);
        }
        else {
            console.log("Conexão Realizada");
        }
    });
    return client;
});
exports.connectToPG = connectToPG;
const closeConnection = (connect) => __awaiter(void 0, void 0, void 0, function* () {
    yield connect
        .end()
        .then(() => console.log("Desconectado"))
        .catch(() => console.log("Erro no Desconect"));
});
exports.closeConnection = closeConnection;
//# sourceMappingURL=connectbd.js.map