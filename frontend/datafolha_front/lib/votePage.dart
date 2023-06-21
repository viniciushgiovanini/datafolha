// ignore_for_file: file_names

import 'package:flutter/material.dart';

class VotePage extends StatelessWidget {
  const VotePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('DataFolha'), centerTitle: true,),
      body: Center(
        child: Container(
          padding: const EdgeInsets.all(20.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              EscolherPresidente(
                title: 'Jair Messias Bolsonaro',
                description: 'abcd',
                image: 'images/Bolsonaro.jpg',
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: const Text('Confirmação'),
                        content: const Text('Deseja votar em Jair Messias Bolsonaro?'),
                        actions: [
                          TextButton(
                            onPressed: () {
                              Navigator.of(context).pop();
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
                description: 'abcd',
                image: 'images/Lula.jpg',
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: const Text('Confirmação'),
                        content: const Text('Deseja votar em Luiz Inácio Lula da Silva?'),
                        actions: [
                          TextButton(
                            onPressed: () {
                              Navigator.of(context).pop();
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

  const EscolherPresidente(
    {super.key, 
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