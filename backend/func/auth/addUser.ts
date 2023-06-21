const text: string = `INSERT INTO public.users(
	user_name, user_email, user_password, user_age, user_cpf, user_sexo)
	VALUES ($1, $2, $3, $4, $5, $6);`;

const adicionarUser = (connection: any, query: string[]): any => {
  return new Promise((resposta: any, rejeito: any) => {
    connection.query(text, query, (erro: any, suc: any) => {
      if (erro || suc.rowCount == 0) {
        rejeito(false);
      } else {
        resposta(true);
      }
    });
  });
};

export { adicionarUser };
