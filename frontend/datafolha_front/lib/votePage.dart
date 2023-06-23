// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'resultados.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class VotePage extends StatelessWidget {
  const VotePage({super.key, required this.text});

  final text;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('DataFolha'),
        centerTitle: true,
      ),
      body: Center(
        child: Container(
          padding: const EdgeInsets.all(20.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              EscolherPresidente(
                title: 'Jair Messias Bolsonaro',
                description: 'Partido Liberal (PL) 22',
                image: 'images/Bolsonaro.jpg',
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: const Text('Confirmação'),
                        content: const Text(
                            'Deseja votar em Jair Messias Bolsonaro?'),
                        actions: [
                          TextButton(
                            onPressed: () async {
                              Map json = {
                                "candidato": "jair messias bolsonaro",
                                "user_email": text["user_email"]
                              };

                              Map json2 = {"user_email": text["user_email"]};

                              var resp = await addVoto(json);
                              var retorno2 = jsonDecode(resp);
                              (retorno2["resp"] ==
                                      'Voto realizado com sucesso !'
                                  ? markVoto(json2)
                                  : "");
                              Navigator.of(context).pop();
                              (retorno2["resp"] ==
                                      'Voto realizado com sucesso !'
                                  ? Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) => Resultados()))
                                  : "");
                              // BD
                            },
                            child: const Text('Votar'),
                          ),
                          TextButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                            child: const Text('Cancelar'),
                          ),
                        ],
                      );
                    },
                  );
                },
              ),
              EscolherPresidente(
                title: 'Luiz Inácio Lula da Silva',
                description: 'Partido dos Trabalhadores (PT) 13',
                image: 'images/Lula.jpg',
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: const Text('Confirmação'),
                        content: const Text(
                            'Deseja votar em Luiz Inácio Lula da Silva?'),
                        actions: [
                          TextButton(
                            onPressed: () async {
                              Map json = {
                                "candidato": "luiz inacio lula da silva",
                                "user_email": text["user_email"]
                              };
                              Map json2 = {"user_email": text["user_email"]};
                              var resp = await addVoto(json);
                              var retorno2 = jsonDecode(resp);

                              (retorno2["resp"] ==
                                      'Voto realizado com sucesso !'
                                  ? markVoto(json2)
                                  : "");
                              Navigator.of(context).pop();
                              (retorno2["resp"] ==
                                      'Voto realizado com sucesso !'
                                  ? Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) => Resultados()))
                                  : "");

                              // BD
                              // print(jsonColors);
                            },
                            child: const Text('Votar'),
                          ),
                          TextButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                            child: const Text('Cancelar'),
                          ),
                        ],
                      );
                    },
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class EscolherPresidente extends StatelessWidget {
  final String title;
  final String description;
  final String image;
  final VoidCallback onPressed;

  const EscolherPresidente({
    super.key,
    required this.title,
    required this.description,
    required this.image,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          width: 350.0,
          height: 350.0,
          child: Image.asset(
            image,
            fit: BoxFit.cover,
          ),
        ),
        const SizedBox(height: 10.0),
        Text(
          title,
          style: const TextStyle(fontSize: 30.0, fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 5.0),
        Text(
          description,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 10.0),
        ElevatedButton(
          onPressed: onPressed,
          child: const Text('Votar'),
        ),
      ],
    );
  }
}

Future<String> addVoto(Map json) async {
  var uri = Uri.parse("http://localhost:4000/votar");

  http.Response resposta;

  resposta = await http.post(uri,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(json));

  return resposta.body;
}

void markVoto(Map json) async {
  var uri = Uri.parse("http://localhost:4000/marcarVoto");

  http.Response resposta;

  resposta = await http.put(uri,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(json));
}
