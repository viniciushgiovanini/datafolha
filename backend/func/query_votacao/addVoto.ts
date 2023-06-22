const txt = `UPDATE votacao SET qtd_votos=$2 WHERE candidato = $1`;

import { getVoto } from "./getVoto";

const addVoto = async (connection: any, queryData: string[]): Promise<any> => {
  return new Promise(async (resposta: any, rejeicao: any): Promise<any> => {
    let qtd_voto_atual = await getVoto(connection, queryData)
      .then((res: any) => res.qtd_votos)
      .catch((err: any) => err);

    if (typeof qtd_voto_atual != "boolean") {
      queryData.push(qtd_voto_atual + 1);
      connection.query(txt, queryData, (err: any, suc: any) => {
        if (err || suc.rowCount == 0) {
          rejeicao(false);
        } else {
          resposta(true);
        }
      });
    } else {
      rejeicao(false);
    }
  });
};

export { addVoto };
