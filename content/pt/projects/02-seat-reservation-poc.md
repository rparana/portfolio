---
title: POC de Reserva de Assentos de Alta Concorrência
summary: Motor distribuído de bloqueio de assentos e disponibilidade em tempo real projetado para evitar reservas duplicadas sob picos de concorrência.
year: '2025'
featured: true
order: 2
stack:
  - Redis
  - MongoDB
  - Node.js
  - SSE
repoUrl: https://github.com/rparana/poc-asaas
---

## Problema

Fluxos simultâneos de seleção de assentos são suscetíveis a condições de corrida (*race conditions*) e reservas duplicadas quando múltiplos usuários disputam o mesmo inventário ao mesmo tempo. Depender exclusivamente de locks em banco de dados ou *polling* degrada a responsividade e aumenta a contenção sob carga.

## Decisões de Arquitetura

- **Bloqueio Distribuído Atômico (Redis):** Implementação de retenções temporárias de assentos utilizando primitivas atômicas do Redis com expiração automática via TTL, garantindo que reservas abandonadas sejam liberadas de forma determinística.
- **Persistência Durável (MongoDB):** Separação do estado efêmero de retenção no Redis dos registros confirmados no MongoDB, mantendo o caminho de escrita rápido enquanto preserva uma fonte de verdade auditável.
- **Atualizações em Tempo Real (Server-Sent Events):** Uso de SSE sobre HTTP padrão para transmitir transições de estado dos assentos (`disponível`, `retido`, `confirmado`) aos clientes conectados sem a sobrecarga de infraestrutura de WebSockets.

## Trade-offs

- **Janela de Consistência Eventual:** Separar retenções no Redis da confirmação no MongoDB introduz uma breve fronteira de reconciliação caso um nó Redis reinicie antes da confirmação; mitigado por limites de TTL e checagens idempotentes na confirmação.
- **SSE vs. WebSockets:** Escolha de SSE unidirecional pela simplicidade de escala horizontal e reconexão nativa no navegador, abrindo mão de comunicação bidirecional no mesmo canal (mutações tratadas via REST padrão).
