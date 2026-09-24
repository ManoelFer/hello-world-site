# Organização do CLAUDE.md e das regras

Vale sempre que alguém pedir para adicionar, mudar ou remover instruções do `CLAUDE.md` ou de `.claude/rules/`.

## O que fica em cada lugar

A pergunta que decide é: **isto serviria num próximo projeto?**

- **Não, só vale aqui** → fica no `CLAUDE.md`. Nunca mova para `.claude/rules/`.
- **Sim, é padrão reaproveitável** → vai para `.claude/rules/`, escrito sem nenhum dado deste projeto.

**`CLAUDE.md`** guarda tudo o que é **específico e pessoal deste projeto**:

- visão geral e índice das regras;
- dados e contexto do cliente: nome, profissão, registro profissional, domínio, cidade, área atendida, público, tipo de negócio no Schema, restrições próprias;
- identidade visual do projeto (cores, fontes, tom de voz), quando for decisão do cliente;
- stack, comandos e definição de pronto;
- exceções do projeto a alguma regra genérica.

**`.claude/rules/`** guarda os **padrões de projeto**, um tema por arquivo: estrutura de pastas, nomes, componentes, estilos, conteúdo, SEO, acessibilidade, regras de setor, processos. Esses arquivos são copiados para projetos futuros, então não levam nome, telefone, domínio, cor de marca nem nenhum outro dado do cliente. Quando um exemplo precisar de dado, use um valor de exemplo (`Nome do Cliente`, `dominio.com.br`, `OAB/UF 000000`).

Se uma instrução mistura as duas coisas, divida: a parte genérica vai para a regra e o dado do projeto fica no `CLAUDE.md`.

## Ao receber uma instrução nova

1. **É padrão de projeto?** (como escrever código, organizar arquivos, estilizar, escrever conteúdo, validar algo) → **não** escreva no `CLAUDE.md`.
   - Se já existe um arquivo do tema em `.claude/rules/`, acrescente lá, na seção certa.
   - Se não existe, crie um arquivo novo e registre-o na tabela de regras do `CLAUDE.md`.
2. **É dado ou decisão só deste projeto?** → vai para a seção "Contexto do cliente" do `CLAUDE.md`, em uma linha. Não crie arquivo em `.claude/rules/` para isso, mesmo que o assunto já tenha uma regra.
3. **Contradiz uma regra genérica?** → registre a exceção no `CLAUDE.md` ("Neste projeto, X em vez de Y") e não altere a regra genérica.
4. Diga ao usuário onde a instrução foi parar, mesmo que ele tenha pedido "adicione no CLAUDE.md".

## Como escrever um arquivo de regra

- Nome em kebab-case e em português: `componentes-astro.md`, `publicidade-advocacia.md`.
- Começa com `# Título` e uma linha dizendo quando a regra se aplica.
- Regras curtas e verificáveis, no imperativo. Exemplos de código só quando esclarecem.
- Um tema por arquivo. Se passar de ~200 linhas, divida por subtema.
- Não duplique regra entre arquivos: escreva num lugar e aponte para ele dos outros.
- Frontmatter `paths:` só quando a regra vale exclusivamente para certos arquivos **e** não é necessária ao criar arquivos novos. Na dúvida, deixe sem `paths` (carrega sempre).

## Manutenção

- Ao criar, renomear ou apagar um arquivo em `.claude/rules/`, atualize a tabela do `CLAUDE.md` na mesma alteração.
- Se o `CLAUDE.md` for um link simbólico (ex.: para `AGENTS.md`), edite o arquivo de destino.
