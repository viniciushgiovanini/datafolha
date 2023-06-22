const text: string = `SELECT * from votacao WHERE candidato = $1`;

const getVoto = async (connection: any, queryData: string[]): Promise<any> => {
  return new Promise((resposta: any, rejeito: any) => {
    connection.query(text, queryData, (err: any, suc: any) => {
      if (err || suc.rowCount == 0) {
        rejeito(false);
      } else {
        resposta(suc.rows[0]);
      }
    });
  });
};

export { getVoto };
