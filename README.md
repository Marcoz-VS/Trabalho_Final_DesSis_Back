# Trabalho_Final_DesSis_Back

Trabalho final do módulo de Desenvolvimento de Sistemas do SENAI, parte do Back-End.

## Como rodar

Crie um banco de preferência MySQL

Copie `.env.example` para `.env`, preencha `DB_*`, `CHAVE_JWT` e (opcional) `CORS_ORIGINS`.

```bash
npm i
node src/server.js
```

Equivalente: `npm start` (ou `npm run dev` com recarregamento via `node --watch`).
