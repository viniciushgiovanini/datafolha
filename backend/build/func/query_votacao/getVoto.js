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
exports.getVoto = void 0;
const text = `SELECT * from votacao WHERE candidato = $1`;
const getVoto = (connection, queryData) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resposta, rejeito) => {
        connection.query(text, queryData, (err, suc) => {
            if (err || suc.rowCount == 0) {
                rejeito(false);
            }
            else {
                resposta(suc.rows[0]);
            }
        });
    });
});
exports.getVoto = getVoto;
//# sourceMappingURL=getVoto.js.map