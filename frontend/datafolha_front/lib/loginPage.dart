// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'registerUserPage.dart';
import 'votePage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class LoginPage extends StatelessWidget {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  LoginPage({super.key});

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
          width: 300.0, // Largura da caixa de formulário
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(height: 20.0),
              const Text(
                'Login',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10.0),
              TextField(
                controller: emailController,
                decoration: const InputDecoration(
                  labelText: 'E-mail',
                ),
              ),
              const SizedBox(height: 10.0),
              TextField(
                controller: passwordController,
                decoration: const InputDecoration(
                  labelText: 'Senha',
                ),
                obscureText: true,
              ),
              const SizedBox(height: 20.0),
              ElevatedButton(
                onPressed: () async {
                  String email = emailController.text;
                  String password = passwordController.text;
                  var retorno = await getUser(email, password);
                  ((retorno == '{"resp":"Email não existente !"}') ||
                          retorno == '{"resp":"Senha incorreta !"}')
                      ? (print("texto"))
                      : Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const VotePage()),
                        );

                  // print('E-mail: $email');
                  // print('Senha: $password');
                },
                child: const Text('Entrar'),
              ),
              const SizedBox(height: 10.0),
              TextButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const RegisterPage()),
                  );
                },
                child: const Text('Novo Usuário? Cadastre-se'),
              ),
              Visibility(
                  visible: true,
                  child: Container(
                    color: Colors.blue[600],
                    alignment: Alignment.center,
                    child: Text('Hello World',
                        style: Theme.of(context)
                            .textTheme
                            .headlineMedium!
                            .copyWith(color: Colors.white)),
                  ))
            ],
          ),
        ),
      ),
    );
  }
}

Future<String> getUser(String email, String senha) async {
  var uri =
      Uri.parse("http://localhost:4000/login?password=$senha&email=$email");

  http.Response resposta;

  resposta = await http.get(uri, headers: <String, String>{
    'Content-Type': 'application/json; charset=UTF-8',
  });
  return resposta.body;
}

Widget ativarTxtErro(BuildContext context, Text txt) {
  return Visibility(
      visible: true,
      child: Container(
        color: Colors.blue[600],
        alignment: Alignment.center,
        child: Text('Hello World',
            style: Theme.of(context)
                .textTheme
                .headlineMedium!
                .copyWith(color: Colors.white)),
      ));
}

Widget desativarTxtErro(BuildContext context, Text txt) {
  return Visibility(
      visible: false,
      child: Container(
        color: Colors.blue[600],
        alignment: Alignment.center,
        child: Text('Hello World',
            style: Theme.of(context)
                .textTheme
                .headlineMedium!
                .copyWith(color: Colors.white)),
      ));
}
