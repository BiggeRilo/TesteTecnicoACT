# Teste Técnico ACT — LMS

Learning Management System entregue como monorepo. Os projetos são independentes para facilitar
a avaliação e podem ser executados separadamente.

```text
.
├── frontend/   Angular 22, Angular Material e Vitest
└── backend/    Java 25, Spring Boot 4.1.0 e PostgreSQL
```

## Execução

### Backend

```bash
cd backend
docker compose up --build
```

A API ficará disponível em `http://localhost:8080`. Consulte o
[README do backend](backend/README.md) para variáveis, credenciais de desenvolvimento e Swagger.

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm start
```

O frontend ficará disponível em `http://localhost:4200` e encaminhará `/api` para o backend.
Consulte o [README do frontend](frontend/README.md) para detalhes.

## Funcionalidades

- Registro de estudantes com idade mínima de 16 anos e e-mail único.
- Autenticação JWT e autorização por perfil.
- Gerenciamento de cursos exclusivo para administradores.
- Até três matrículas ativas por estudante, com prazo de seis meses.
- Registro, edição e remoção de tarefas em incrementos de 30 minutos.
- Categorias de tarefa persistidas em tabela relacional.

O enunciado original está disponível em [Avaliação Técnica.pdf](Avaliação%20Técnica.pdf).
