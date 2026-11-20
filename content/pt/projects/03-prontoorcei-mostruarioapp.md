---
title: ProntoOrcei & MostruárioApp
summary: Aplicativos móveis offline-first desenvolvidos em Flutter para apoiar orçamentos em campo e apresentação de catálogos em ambientes com baixa conectividade.
year: '2023'
featured: true
order: 3
stack:
  - Flutter
  - Offline-first
  - Mobile
---

## Problema

Representantes comerciais e prestadores de serviço em campo frequentemente atuam em locais com conectividade móvel instável ou ausente, onde aplicativos dependentes exclusivamente da nuvem travam o fluxo de orçamento e demonstração de produtos.

## Decisões de Arquitetura

- **Persistência Local Offline-First:** Estruturação do cliente Flutter em torno de armazenamento local prioritário, permitindo navegação em catálogos, montagem de orçamentos e atendimento de clientes de forma determinística sem acesso à rede.
- **Base Única Multiplataforma:** Uso do Flutter para manter comportamento de interface consistente e desempenho responsivo em dispositivos Android e iOS a partir de um único código-fonte.
- **Sincronização Assíncrona:** Desacoplamento entre ações locais do usuário e a sincronização em segundo plano, evitando que quedas de sinal interrompam a operação em campo.

## Trade-offs

- **Complexidade na Resolução de Conflitos:** Suportar mutações offline exige regras explícitas de ordenação de sincronização e tratamento de conflitos em comparação a um modelo REST puramente autoritativo no servidor.
- **Consumo de Armazenamento Local:** Manter catálogos e mídias em cache local melhora a responsividade em campo ao custo de gerenciar ciclo de vida de armazenamento e atualizações incrementais de ativos.
