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
exports.addVoto = void 0;
const txt = `UPDATE votacao SET qtd_votos=$2 WHERE candidato = $1`;
const getVoto_1 = require("./getVoto");
const addVoto = (connection, queryData) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resposta, rejeicao) => __awaiter(void 0, void 0, void 0, function* () {
        let qtd_voto_atual = yield (0, getVoto_1.getVoto)(connection, queryData)
            .then((res) => res.qtd_votos)
            .catch((err) => err);
        if (typeof qtd_voto_atual != "boolean") {
            queryData.push(qtd_voto_atual + 1);
            connection.query(txt, queryData, (err, suc) => {
                if (err || suc.rowCount == 0) {
                    rejeicao(false);
                }
                else {
                    resposta(true);
                }
            });
        }
        else {
            rejeicao(false);
        }
    }));
});
exports.addVoto = addVoto;
//# sourceMappingURL=addVoto.js.map