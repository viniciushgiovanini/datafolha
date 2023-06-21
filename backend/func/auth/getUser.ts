const text: string = `SELECT * from users WHERE user_email = $1`;

const requestUser = (connection: any, query: string[]): any => {
  return new Promise((resposta: any, rejeito: any) => {
    connection.query(text, query, (err: any, suc: any) => {
      if (err || suc.rowCount == 0) {
        rejeito(false);
      } else {
        resposta(suc.rows[0]);
      }
    });
  });
};

export { requestUser };
