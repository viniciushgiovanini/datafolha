const txt: string = `UPDATE users SET votacao = true WHERE user_email = $1;`;

const markVoto = async (connection: any, queryData: string[]): Promise<any> => {
  return new Promise(async (resposta: any, rejeicao: any): Promise<any> => {
    connection.query(txt, queryData, (err: any, suc: any) => {
      if (err || suc.rowCount == 0) {
        rejeicao(false);
      } else {
        resposta(true);
      }
    });
  });
};

export { markVoto };
