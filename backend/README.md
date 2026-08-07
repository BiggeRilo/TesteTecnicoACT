# LMS — Backend

API REST do teste técnico ACT, implementada com Java 25, Spring Boot 4.1.0, Spring Data JPA,
Spring Security, PostgreSQL e Flyway.

## Execução com Docker

```bash
docker compose up --build
```

Isso inicia PostgreSQL em `localhost:5432` e a API em `http://localhost:8080`.

Credenciais administrativas de desenvolvimento:

- E-mail: `admin@act.local`
- Senha: `ChangeMe123!`

As credenciais são configuráveis pelas variáveis `ADMIN_EMAIL` e `ADMIN_PASSWORD` e o usuário
administrativo só é criado quando `ADMIN_ENABLED=true`.

## Execução local

Requisitos: JDK 25 e PostgreSQL.

```bash
docker compose up -d postgres
ADMIN_ENABLED=true ./mvnw spring-boot:run
```

Principais variáveis:

| Variável | Valor padrão |
| --- | --- |
| `DB_URL` | `jdbc:postgresql://localhost:5432/lms` |
| `DB_USERNAME` | `lms` |
| `DB_PASSWORD` | `lms` |
| `JWT_SECRET` | segredo somente para desenvolvimento |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:4200` |

## Qualidade

```bash
./mvnw test
./mvnw verify
```

As migrations estão em `src/main/resources/db/migration`. O Hibernate apenas valida o schema;
ele não cria nem altera tabelas.

## Documentação da API

Com a aplicação em execução:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI: `http://localhost:8080/v3/api-docs`

O `timeSpent` dos logs segue o contrato do frontend: uma data/hora cujo horário representa a
duração. Por exemplo, `2026-08-07T01:30:00` representa uma hora e trinta minutos na tarefa do dia
`2026-08-07`.
