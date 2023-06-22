"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestUser = void 0;
const text = `SELECT * from users WHERE user_email = $1`;
const requestUser = (connection, query) => {
    return new Promise((resposta, rejeito) => {
        connection.query(text, query, (err, suc) => {
            if (err || suc.rowCount == 0) {
                rejeito(false);
            }
            else {
                resposta(suc.rows[0]);
            }
        });
    });
};
exports.requestUser = requestUser;
//# sourceMappingURL=getUser.js.map