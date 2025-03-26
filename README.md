# MosaicQ
# Victor Rahal

Este projeto implementa uma API RESTful para gerenciamento de tarefas utilizando **Node.js**, **Express.js**, e **SQLite**. A API permite criar, listar, atualizar e excluir tarefas. As tarefas podem ter um título, uma descrição opcional e um status (pendente, em andamento ou concluída).

# Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework para construção de APIs RESTful.
- **SQLite**: Banco de dados leve, utilizado para persistência de dados.
- **TypeORM**: ORM para interação com o banco de dados SQLite.
- **dotenv**: Gerenciamento de variáveis de ambiente.

# Instalação

1. Clone este repositório para sua máquina local:

   ```bash
   git clone https://github.com/seu-usuario/task-api.git
   cd task-api

npm install

DB_TYPE=sqlite
DB_PATH=./database.sqlite
PORT=3000

npm start


# Estrutura do Projeto

plaintext
/your-repository

    src/
        controllers/    Lógica da API para tarefas
        entities/       Definição da entidade de tarefa
        routes/         Definição das rotas da API
        database/       Configuração de conexão com o banco de dados
        server.ts       Configuração e execução do servidor
    .gitignore          Arquivos e pastas ignoradas pelo Git
    package.json        Dependências e scripts do projeto
    README.md           Este arquivo
    tsconfig.json       Configuração do TypeScript


# EndPoints Api

# 1. Criar Tarefa (`POST /tasks`)

Cria uma nova tarefa.

Body:

json
{
  "title": "Título da tarefa",
  "description": "Descrição da tarefa",
  "status": "pendente"  # ou "em andamento", "concluído"
}


# Terá como resposta

{
  "id": 1,
  "title": "Título da tarefa",
  "description": "Descrição da tarefa",
  "status": "pendente",
  "createdAt": "2025-03-26T00:00:00.000Z"
}


