# Lililog landing page

Landing page estática para apresentar a Lililog, explicar a operação de entregadores dedicados e captar contatos comerciais.

## Arquivos

- `index.html`: estrutura e conteúdo da página.
- `styles.css`: layout responsivo e identidade visual.
- `script.js`: envio do formulário pelo WhatsApp.
- `assets/hero-lililog.png`: imagem principal gerada para o projeto.
- `assets/logo-lililog.svg`: marca vetorial usada no cabeçalho e rodapé.

## Como abrir

Abra `index.html` no navegador ou rode um servidor local:

```bash
python3 -m http.server 4173
```

Depois acesse `http://localhost:4173`.

## WhatsApp comercial

O formulário abre uma mensagem preenchida no WhatsApp. Troque o número definido em `script.js` pelo WhatsApp real da Lililog, usando DDI + DDD + número, somente dígitos:

```js
const WHATSAPP_NUMBER = "5521997227164";
```
