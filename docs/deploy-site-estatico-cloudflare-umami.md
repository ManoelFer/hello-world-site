# Publicação de site estático: Cloudflare Pages + Umami

Guia de referência para publicar sites estáticos de clientes (Astro + Tailwind) e reaproveitar em próximos projetos.

> **Neste repositório** o site usa **Workers Static Assets** (`wrangler.jsonc`) em vez de Pages, porque precisa de `html_handling` e `not_found_handling` configurados no código. O passo a passo de DNS, Umami e lançamento abaixo vale igual; o deploy e o cutover deste site estão no `README.md`.

> Este documento não contém credenciais, IDs de conta, tokens nem dados pessoais. Onde aparecer `<...>`, substitua pelo valor do projeto.

---

## 1. Decisões e motivos

### Hospedagem: Cloudflare Pages (plano gratuito)

| Opção | Por que ficou de fora / foi escolhida |
|---|---|
| **Vercel Hobby** | Plano grátis é **só para uso pessoal, não comercial**. O site de um profissional ou empresa é comercial. |
| **Netlify Free** | Funciona, mas cobra por **créditos mensais**. Se passar do limite, o site **sai do ar** até virar o mês. |
| **Cloudflare Pages** ✅ | Permite **uso comercial** no plano grátis, **não limita a banda** de sites estáticos, tem CDN com servidores no Brasil, HTTPS automático e **DNS gratuito** no mesmo painel. Deploy automático via Git e URL de pré-visualização por branch/PR. |

**Pages em vez de Workers:** para um site 100% estático, o Pages não exige `wrangler.jsonc` nem nenhuma mudança no repositório. Workers só vale a pena se o site precisar de lógica no servidor.

### Análise de acesso: Umami Cloud (plano Hobby, gratuito)

| Opção | Por que ficou de fora / foi escolhida |
|---|---|
| **Plausible** | Não tem plano grátis (é pago, com teste de 30 dias). A versão própria exige servidor. |
| **Cloudflare Web Analytics** | Grátis e sem cookies, mas **não registra eventos personalizados**. Perderíamos justamente as conversões (WhatsApp, telefone, formulário). |
| **Google Analytics** | Usa cookies, exige banner de consentimento (LGPD) e deixa o site mais pesado. |
| **Umami Cloud** ✅ | Grátis no plano Hobby, **sem cookies** (dispensa banner), leve, com **eventos personalizados** e **metas**. Os limites do plano Hobby atendem um site desse porte. Confira os limites atuais em umami.is ao criar a conta. |

### Domínio

- Domínios `.br` são registrados no **Registro.br**. Categorias profissionais como `.adv.br` exigem que o titular seja da profissão.
- O **titular** do domínio deve ser o **cliente** (CPF/CNPJ dele), não o desenvolvedor. O desenvolvedor pode ficar como contato técnico.
- O DNS fica na Cloudflare. O Registro.br só aponta para os nameservers dela.

---

## 2. Arquitetura final

```
Visitante
   │
   ▼
Registro.br ──(nameservers)──► Cloudflare DNS
                                   │
                                   ├─ <domínio>      → Pages (principal)
                                   └─ www.<domínio>  → redirect 301 → domínio principal
                                   │
                                   ▼
                          Cloudflare Pages ◄── GitHub (push na main = deploy)
                                   │
                                   ▼
                          Umami Cloud (script + eventos)
```

---

## 3. Passo a passo

### 3.1 Cloudflare: adicionar a zona do domínio

1. Crie a conta Cloudflare, de preferência **no e-mail do cliente**, para que ele seja o dono.
2. Vá em **Domínios → Adicionar domínio → Conectar um domínio** e digite o domínio.
3. Escolha o plano **Livre ($0)**.
4. Revise os registros DNS importados. No Registro.br, um domínio novo sem e-mail vem com MX nulo, SPF `-all` e DMARC `reject`, e esses registros podem ficar como estão.
5. Anote os **2 nameservers** que a Cloudflare indicar (ex.: `xxxx.ns.cloudflare.com`).

> A tela da Cloudflare pode mostrar o registrador errado (ex.: "GoDaddy"). Ignore: o que vale é onde o domínio está registrado.

### 3.2 Registro.br: trocar os servidores DNS

1. Entre no Registro.br com um usuário que seja **contato administrativo ou técnico** do domínio. Só eles veem a opção de alterar o DNS.
2. Abra o domínio → **DNS → Alterar servidores DNS**.
3. Troque `a.auto.dns.br` e `b.auto.dns.br` pelos 2 nameservers da Cloudflare e salve. Deixe o DNSSEC **desligado** por enquanto.
4. O Registro.br manda um e-mail confirmando a alteração. A Cloudflare ativa a zona em minutos ou em algumas horas.

**Problema que encontramos:** a opção "Alterar servidores DNS" **não aparecia**.

- **Causa:** o domínio estava vinculado a um **Provedor de serviços** (GoDaddy), porque o CPF da cliente tinha uma conta ligada a esse provedor. Com provedor vinculado, o painel esconde a edição de DNS.
- **Solução:** em **Provedor de serviços → Alterar provedor**, selecione **NENHUM (0)**. Depois disso a opção de DNS aparece.
- Se o domínio foi comprado e pago direto no Registro.br, é seguro remover o provedor. Se foi comprado por um provedor, a troca de DNS deve ser feita no painel dele.

### 3.3 Cloudflare Pages: conectar o repositório

1. Vá em **Calcular → Trabalhadores e Páginas → Criar aplicativo → Pages → Conectar ao Git**.
2. Autorize o GitHub e escolha o repositório.
3. Configuração do build (Astro):

   | Campo | Valor |
   |---|---|
   | Ramificação de produção | `main` |
   | Predefinição de estrutura | Astro |
   | Comando de build | `yarn build` |
   | Diretório de saída | `dist` |
   | Diretório raiz | *(em branco, se o `package.json` está na raiz)* |
   | Variável de ambiente | `NODE_VERSION` = **versão exata** (ex.: `24.16.0`) |

4. Clique em **Salvar e implantar**.

**Problema que encontramos:** com `NODE_VERSION = 24`, a Cloudflare usou uma versão 24 antiga já instalada (24.13.1). O `eslint-plugin-astro` exigia `^24.16.0`, e o `yarn install` falhou com *"Módulo incompatível"*.

- **Solução:** usar uma **versão exata** em `NODE_VERSION` e manter o `.nvmrc` com a mesma versão.

**Pipeline:** não precisa de GitHub Actions. A integração Git da Cloudflare já faz:

- Push na `main` → publica em produção.
- Qualquer outra branch ou PR → URL de pré-visualização.

> ⚠️ **Não** configure nada em *GitHub → Settings → Pages*. Isso é o GitHub Pages, outra hospedagem, que pode criar um arquivo `CNAME` e conflitar com a Cloudflare.

### 3.4 Domínio próprio no Pages

1. Abra o projeto em **Trabalhadores e Páginas** e vá na aba **Domínios personalizados → Configure um domínio personalizado**.
2. Adicione o domínio raiz (ex.: `dominio.com.br`) e confirme. A Cloudflare cria o CNAME sozinha.
3. Repita com `www.<domínio>`.
4. Aguarde os dois ficarem **Ativo** com **SSL ativado**. Leva poucos minutos quando a zona já está ativa.

### 3.5 Redirecionar www para o domínio raiz e forçar HTTPS

1. Na zona, vá em **Regras → Regras de redirecionamento → Modelos → "Redirecionamento da WWW para a raiz"**.
   - Nome: `www para raiz`
   - URL de solicitação (padrão curinga): `https://www.<domínio>/*`
   - URL de destino: `https://<domínio>/${1}`
   - Código: **301**
   - ✅ **Preservar string de consulta**
2. Em **SSL/TLS → Certificados Edge**, ative **Sempre usar HTTPS**. Assim `http://` e `http://www` também caem no domínio principal.
3. Teste: `http://www.<domínio>/?teste=1` deve terminar em `https://<domínio>/?teste=1`.

### 3.6 Umami Cloud

1. Crie a conta em cloud.umami.is (de preferência no e-mail do cliente) e vá em **Sites da Web → Adicionar site** (nome + domínio).
2. Em **Editar → Código de rastreamento**, copie o **Website ID** e a URL do script (`https://cloud.umami.is/script.js`).
3. No repositório, preencha a configuração de analytics. Neste projeto ela fica em `src/data/site.ts`:

   ```ts
   analytics: {
     provedor: "umami",
     id: "<WEBSITE_ID>",
     script: "https://cloud.umami.is/script.js",
   },
   ```

4. Os eventos de conversão já estão no código (via `data-umami-event` / `umami.track`):

   | Evento | Quando dispara |
   |---|---|
   | `whatsapp_click` | Clique no botão ou link do WhatsApp |
   | `phone_click` | Clique no telefone (`tel:`) |
   | `form_submit` | Envio do formulário de contato |

5. Em **Metas → + Meta**, crie uma meta por evento, com Ação **Evento desencadeado** e o nome exato do evento.
6. Faça o push, espere o deploy e teste os 3 eventos no site publicado. Eles aparecem em **Eventos** e **Metas**.
7. Atualize a **Política de Privacidade** citando o Umami (análise sem cookies e sem dados pessoais).

**Problema que encontramos:** a **tradução automática do Chrome** traduzia a interface do Umami. Os nomes das metas apareciam errados ("Clique sem telefone", "Envio do GA") e um erro de tela surgia ao salvar.

- Os dados salvos estavam corretos. Era só a exibição.
- **Solução:** desativar a tradução do Chrome para `cloud.umami.is`.

**Observação:** o Pages pode ativar o **Cloudflare Web Analytics** sozinho (script `beacon.min.js`). Desative em **Projeto → Métricas** ou cite-o também na Política de Privacidade.

---

## 4. Checklist de lançamento (fora do código)

- [ ] **Google Search Console:** propriedade do tipo **Domínio**, verificada por **registro TXT** no DNS da Cloudflare (sem meta tag). Enviar o `sitemap-index.xml` e pedir indexação da Home.
- [ ] **Bing Webmaster Tools:** importar do Search Console.
- [ ] **Perfil da Empresa no Google:** colocar o link do site. Depois, colocar o link do perfil no site (`social.perfilGoogle` → entra no `sameAs` do Schema).
- [ ] **`public/_headers`:** cache longo e imutável em `/_astro/*` e cabeçalhos de segurança (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- [ ] **(Opcional) Email Routing da Cloudflare:** `contato@<domínio>` encaminhando para o e-mail do cliente. Responder usando esse endereço exige configuração extra.
- [ ] **(Opcional) DNSSEC:** ativar na Cloudflare e cadastrar o DS no Registro.br.

---

## 5. Checklist rápido para o próximo site

1. Registrar o domínio no Registro.br **no CPF/CNPJ do cliente**, **sem provedor de serviços**.
2. Criar as contas Cloudflare e Umami no e-mail do cliente.
3. Cloudflare → adicionar zona (plano Livre) → copiar os nameservers.
4. Registro.br → alterar os servidores DNS.
5. Pages → conectar o Git → build com `NODE_VERSION` **exato**.
6. Pages → domínios personalizados (raiz + www).
7. Regra de redirect www → raiz (301) + Sempre usar HTTPS.
8. Umami → cadastrar o site → colocar o ID no código → criar metas → testar eventos.
9. Search Console, Bing e Perfil da Empresa no Google.

**Custo total mensal: R$ 0**, pagando apenas o domínio no Registro.br.
