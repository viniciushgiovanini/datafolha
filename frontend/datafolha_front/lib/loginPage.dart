// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'registerUserPage.dart';
import 'votePage.dart';

class LoginPage extends StatelessWidget {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('DataFolha'), centerTitle: true,),
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
                onPressed: () {
                  String email = emailController.text;
                  String password = passwordController.text;

                  print('E-mail: $email');
                  print('Senha: $password');
                  Navigator.push(context, 
                  MaterialPageRoute(builder: (context) => const VotePage()),
                  );
                },
                child: const Text('Entrar'),
              ),
              const SizedBox(height: 10.0),
              TextButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const RegisterPage()),
                  );
                },
                child: const Text('Novo Usuário? Cadastre-se'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}