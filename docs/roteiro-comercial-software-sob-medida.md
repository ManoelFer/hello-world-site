# Roteiro comercial: Software sob medida

Como vender e conduzir o 4º plano do site ("Software sob medida": apps, APIs e sistemas para uma empresa específica). O plano não mostra preço no site: o valor sai do diagnóstico. Levantamento feito em 26/09/2026.

No site, o card fica em `src/data/packages.ts` (`planoSobMedida`) e aponta para `/desenvolvimento-de-software-goiania/`. O card promete duas coisas que este roteiro precisa cumprir:

- diagnóstico gratuito por videochamada;
- pagamento por etapas entregues.

## Referências de mercado (Brasil, 2026)

| Referência                                                      | Valor                                                          |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| Hora de freelancer                                              | R$ 50 a 150                                                    |
| Hora de software house                                          | R$ 120 a 280 (equipe sênior com processo completo: até R$ 600) |
| Sistema interno simples (5 a 10 telas, 1 perfil, sem app)       | R$ 40 mil a 80 mil numa software house                         |
| MVP de aplicativo                                               | R$ 45 mil a 120 mil                                            |
| Produto completo com integrações                                | R$ 300 mil ou mais                                             |
| Cada integração externa (ERP, CRM, gateway, API contábil)       | + R$ 5 mil a 50 mil                                            |
| Infraestrutura de um sistema com tráfego médio                  | R$ 500 a 2.000/mês                                             |

## Processo

### 1. Conversa inicial (grátis)

- 30 minutos, pelo WhatsApp ou por videochamada.
- Objetivo: entender o problema e ver se software sob medida faz sentido. Se um sistema pronto resolve, diga isso, como já promete o FAQ da página de software.

### 2. Diagnóstico

- **Agora (sem cases de software):** gratuito, como está no card do site.
- **Quando a procura crescer:** vire um "diagnóstico técnico" pago, de R$ 1.500 a 3.000, descontado do projeto se o cliente fechar. Isso filtra quem só quer um orçamento para comparar. Ao mudar, atualize `planoSobMedida.inclui` no site.
- **O que o diagnóstico mapeia:**
  - processo atual;
  - quem usa o sistema e com quais perfis;
  - telas;
  - integrações;
  - dados pessoais envolvidos (LGPD);
  - o que é indispensável na primeira versão.

### 3. Proposta com escopo fechado

- **Comece pela primeira versão enxuta (MVP):** o menor sistema que resolve a dor principal. O resto vira as etapas seguintes.
- **Estimativa:** horas por funcionalidade, mais 20% a 30% de folga para imprevistos.
- **Hora sugerida: R$ 120 a 150.** Fica acima do freelancer, abaixo da software house, e é coerente com um desenvolvedor sênior que atende sozinho e direto.
- **A proposta traz:**
  - escopo;
  - o que não está incluso;
  - prazo em semanas;
  - preço fechado;
  - etapas de entrega e forma de pagamento.

### 4. Pagamento por etapas

- 30% na assinatura, 40% na entrega intermediária aprovada e 30% na entrega final.
- **Pix** (taxa zero). Em valores altos, o cartão sai caro: a InfinitePay cobra 9,67% em 6x no Link de Pagamento (ver `packages.ts`).
- Cada etapa só é cobrada depois que o cliente testa e aprova o que foi entregue.

### 5. Depois da entrega

- **Garantia de 90 dias** para bugs, ou seja, o que não funciona como está no escopo.
- **Sustentação mensal (opcional):**
  - banco de horas, por exemplo 10 h/mês por R$ 1.200 a 1.500;
  - correções, ajustes e pequenas funções novas;
  - horas não usadas não acumulam.
- **Infraestrutura:** o servidor fica na conta do cliente, que paga direto ao provedor. Ou é repassada pelo custo, sem margem.

### 6. Contrato

- Escopo e critérios de aceite de cada etapa.
- Pedido de mudança fora do escopo: cobrado por hora, com aprovação por escrito antes.
- Código e propriedade intelectual entregues ao cliente após a quitação.
- Confidencialidade.
- LGPD, quando o sistema tratar dados pessoais.
- Prazo de resposta do cliente: o prazo do projeto pausa enquanto se espera material ou aprovação.

## Próximos passos

- Depois de 2 ou 3 cases de software publicados, mostre no card "projetos a partir de R$ X mil". Isso afasta quem espera um sistema por poucos reais e evita diagnóstico grátis para quem não vai fechar.
- Cada projeto entregue vira um case em `src/data/portfolio.ts` (só com autorização do cliente) e, se possível, um artigo no blog.

## Fontes

- [nFactory: quanto custa um sistema ou app em 2026](https://nfactory.com.br/blog/quanto-custa-desenvolver-sistema-aplicativo-2026)
- [Inove Dados: quanto custa um sistema personalizado](https://inovedados.com.br/blog/quanto-custa-desenvolver-um-sistema)
- [Huios: software sob medida em 2026](https://huiosweb.com.br/blog/quanto-custa-desenvolver-um-software-sob-medida)
- [Evoris: quanto custa software sob medida](https://evoris.ai/blog/quanto-custa-software-sob-medida)
- [Sudo: quanto custa um aplicativo](https://sudo.com.br/blog/quanto-custa-desenvolver-um-aplicativo/)
- [Forja de Sistemas: freelancer vs software house para MVP](https://forjadesistemas.com.br/blog/freelancer-vs-software-house-mvp-2026/)
- [Devio: discovery vs escopo fechado](https://devio.com.br/blog/discovery-tecnologico-vs-escopo-fechado)
- [Mind Group: modelos de contratação em 2026](https://mindconsulting.com.br/2026/09/staff-augmentation-vs-squad-dedicado-vs-projeto-fechado-qual-modelo-de-contratacao-escolher-em-2026/)
