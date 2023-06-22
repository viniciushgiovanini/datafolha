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
exports.getAllvotos = void 0;
const txt = `SELECT candidato, qtd_votos
FROM public.votacao ORDER BY qtd_votos DESC;`;
const getAllvotos = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resposta, rejeicao) => {
        connection.query(txt, (err, suc) => {
            if (err || suc.rowCount == 0) {
                rejeicao(false);
            }
            else {
                let finalData = [];
                finalData.push(suc.rows[0]);
                finalData.push(suc.rows[1]);
                resposta(finalData);
            }
        });
    });
});
exports.getAllvotos = getAllvotos;
//# sourceMappingURL=getAllvotos.js.map