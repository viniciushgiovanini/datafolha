// ignore_for_file: library_private_types_in_public_api

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController cpfController = TextEditingController();
  String? genderValue;
  DateTime? selectedDate;

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Cadastrar novo usuário'),
        centerTitle: true,
      ),
      body: Center(
        child: Container(
          padding: const EdgeInsets.all(20.0),
          width: 300.0, // Largura da caixa de formulário
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Preencha o Formulário',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 20.0),
              TextField(
                controller: nameController,
                decoration: const InputDecoration(
                  labelText: 'Nome',
                ),
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
              const SizedBox(height: 10.0),
              TextField(
                controller: cpfController,
                decoration: const InputDecoration(
                  labelText: 'CPF',
                ),
              ),
              const SizedBox(height: 10.0),
              DropdownButtonFormField<String>(
                value: genderValue,
                decoration: const InputDecoration(
                  labelText: 'Sexo',
                ),
                items: ['Feminino', 'Masculino', 'Outro'].map((String value) {
                  return DropdownMenuItem<String>(
                    value: value,
                    child: Text(value),
                  );
                }).toList(),
                onChanged: (String? newValue) {
                  setState(() {
                    genderValue = newValue;
                  });
                },
              ),
              const SizedBox(height: 10.0),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Data de Nascimento:',
                    style: TextStyle(fontSize: 16),
                  ),
                  ElevatedButton(
                    onPressed: () => _selectDate(context),
                    child: Text(selectedDate != null
                        ? DateFormat('dd/MM/yyyy').format(selectedDate!)
                        : 'Selecionar'),
                  ),
                ],
              ),
              const SizedBox(height: 20.0),
              ElevatedButton(
                onPressed: () {
                  String name = nameController.text;
                  String email = emailController.text;
                  String password = passwordController.text;
                  String cpf = cpfController.text;
                  String gender = genderValue!;
                  String? birthdate = selectedDate != null
                      ? DateFormat('dd/MM/yyyy').format(selectedDate!)
                      : null;

                  List<String> colors = [name, email, password, cpf, gender];

                  String jsonOficial =
                      '{"nome": "$name","email":"$email","password":"$password","sexo":"$gender","cpf":"$cpf", "age": "12"}';

                  //Use jsonEncode method
                  // String jsonColors = jsonEncode(colors);
                  // print(jsonColors);
                  Map json = {
                    'nome': name,
                    'password': password,
                    'email': email,
                    'sexo': gender,
                    'cpf': cpf,
                    'age': birthdate
                  };
                  // print(json);
                  postUser(json);

                  // print('Nome: $name');
                  // print('E-mail: $email');
                  // print('Senha: $password');
                  // print('CPF: $cpf');
                  // print('Sexo: $gender');
                  // print('Data de Nascimento: $birthdate');
                },
                child: const Text('Cadastrar'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void postUser(Map json) async {
    var uri = Uri.parse("http://localhost:4000/addUser");

    http.Response resposta;

    resposta = await http.post(uri,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(json));
  }
}
