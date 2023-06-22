const txt: string = `SELECT candidato, qtd_votos
FROM public.votacao ORDER BY qtd_votos DESC;`;

const getAllvotos = async (connection: any): Promise<any> => {
  return new Promise((resposta: any, rejeicao: any) => {
    connection.query(txt, (err: any, suc: any) => {
      if (err || suc.rowCount == 0) {
        rejeicao(false);
      } else {
        let finalData: string[] = [];
        finalData.push(suc.rows[0]);
        finalData.push(suc.rows[1]);
        resposta(finalData);
      }
    });
  });
};

export { getAllvotos };
