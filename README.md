# LMS — Front-end (Angular 22)

Front-end do **Learning Management System** (teste técnico ACT). Angular 22 (≥ 21), standalone
components, Signals, Angular Material e consumo de API RESTful.

## Funcionalidades

1. **Registro de estudantes** — cadastro com primeiro nome, último nome, data de nascimento
   (mínimo 16 anos), e-mail único e telefone.
2. **Administração de cursos** — criar, editar e remover cursos (apenas ADMIN). Nome único,
   matrícula por tempo indeterminado.
3. **Matrícula e log de tarefas** — o estudante se matricula (máx. 3 cursos simultâneos, prazo de
   conclusão de 6 meses) e registra tarefas com data, categoria (`PESQUISA`, `PRATICA`,
   `ASSISTIR_VIDEOAULA`), descrição e tempo gasto em incrementos de 30 minutos (editável e
   removível, múltiplos logs por dia).

## Stack

- Angular 22 (standalone components, Signals, control flow)
- Angular Material 22 (M3)
- RxJS + `HttpClient` com interceptors (JWT + normalização de erros)
- Reactive Forms com validações customizadas
- Vitest para testes unitários

## Requisitos

- Node.js 22 LTS ou superior
- Backend Spring Boot rodando em `http://localhost:8080` (proxy `/api` já configurado)

## Rodando

```bash
npm install
npm start          # http://localhost:4200 (proxy /api → localhost:8080)
```

```bash
npm run build      # build de produção
npm run lint       # ESLint
npm test           # testes unitários (Vitest)
```

## Contrato da API (RESTful)

| Método | Rota                              | Descrição                    |
| ------ | --------------------------------- | ---------------------------- |
| POST   | `/api/auth/register`              | Registrar estudante          |
| POST   | `/api/auth/login`                 | Login                        |
| GET    | `/api/courses`                    | Listar cursos                |
| GET    | `/api/courses/{id}`               | Detalhe do curso             |
| POST   | `/api/courses`                    | Criar curso (ADMIN)          |
| PUT    | `/api/courses/{id}`               | Atualizar curso (ADMIN)      |
| DELETE | `/api/courses/{id}`               | Remover curso (ADMIN)        |
| GET    | `/api/students/me/enrollments`    | Matrículas do estudante      |
| POST   | `/api/enrollments`                | Matricular `{ courseId }`    |
| GET    | `/api/enrollments/{id}/logs`      | Tarefas da matrícula         |
| POST   | `/api/enrollments/{id}/logs`      | Registrar tarefa             |
| PUT    | `/api/logs/{logId}`               | Atualizar tarefa             |
| DELETE | `/api/logs/{logId}`               | Remover tarefa               |

`AuthResponse`: `{ accessToken, refreshToken, tokenType, user }`.

`TaskLog.timeSpent`: ISO datetime — o front envia o tempo gasto (múltiplo de 30 min) codificado no
horário do próprio dia da tarefa (ex.: `2026-08-07T01:30:00` = 1h30). O campo `date` guarda o dia da
tarefa.

## Estrutura

```
src/app/
├─ core/         auth, interceptors, guards, serviços de dados
├─ shared/       models, validators, utils, componentes reutilizáveis
└─ features/
   ├─ auth/      login, registro
   ├─ courses/   lista, detalhe, CRUD admin
   └─ enrollments/  meus cursos, diário de tarefas
```

## Suposições

- Registro inclui senha (necessária para o login posteriormente).
- Enum de categoria sem acento no valor da API: `PRATICA`.
- As regras de negócio são também validadas no back-end; o front as espelha para melhor UX
  (idade mínima, e-mail único `409`, limite de 3 matrículas, múltiplo de 30 min).
- Rotas admin protegidas por guard de role.
