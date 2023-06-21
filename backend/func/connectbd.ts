//imports
const { Client } = require("pg");
require("dotenv").config({ path: ".././.env" });

const connectToPG = async (): Promise<any> => {
  const client: any = new Client({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
  });
  await client.connect((err: any) => {
    if (err) {
      console.log(`Erro na Conexão`, err.stack);
    } else {
      console.log("Conexão Realizada");
    }
  });

  return client;
};

const closeConnection = async (connect: any): Promise<any> => {
  await connect
    .end()
    .then(() => console.log("Desconectado"))
    .catch(() => console.log("Erro no Desconect"));
};

export { connectToPG, closeConnection };
