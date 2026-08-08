# LMS — Frontend

Interface Angular 22 do Learning Management System do teste técnico ACT.

## Requisitos

- Node.js 24.15 ou superior
- npm 10 ou superior
- Backend disponível em `http://localhost:8080`

## Execução

```bash
npm install
npm start
```

A aplicação será iniciada em `http://localhost:4200`. Durante o desenvolvimento, o proxy definido
em `proxy.conf.json` encaminha as requisições de `/api` para o backend.

## Comandos

```bash
npm run build
npm run lint
npm test -- --watch=false
```

## Autenticação

- O access token JWT é enviado automaticamente nas rotas protegidas.
- Quando o backend responde `401`, o frontend usa o refresh token uma única vez para renovar a
  sessão e repete a requisição original.
- Requisições simultâneas compartilham a mesma renovação.
- Se a renovação falhar, os dados locais são removidos e o usuário é redirecionado para o login.
- As rotas combinam autenticação com autorização por perfil (`STUDENT` ou `ADMIN`).

## Estrutura

```text
src/app/
├── core/       interceptors, guards, layout e serviços
├── features/   autenticação, cursos e matrículas
└── shared/     modelos, componentes, validadores e utilitários
```
