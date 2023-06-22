"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adicionarUser = void 0;
const text = `INSERT INTO public.users(
	user_name, user_email, user_password, user_age, user_cpf, user_sexo)
	VALUES ($1, $2, $3, $4, $5, $6);`;
const adicionarUser = (connection, query) => {
    return new Promise((resposta, rejeito) => {
        connection.query(text, query, (erro, suc) => {
            if (erro || suc.rowCount == 0) {
                rejeito(false);
            }
            else {
                resposta(true);
            }
        });
    });
};
exports.adicionarUser = adicionarUser;
//# sourceMappingURL=addUser.js.map