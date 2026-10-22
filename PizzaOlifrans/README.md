# 🍕 Olifrans Pizza - Site Profissional (v5.0 Ultimate)

Site estático de alta performance, otimizado para Core Web Vitals, SEO Local Avançado, conversão via WhatsApp e conformidade rigorosa com a LGPD.

## 🚀 Instalação e Publicação
1. Crie uma pasta e salve os 5 arquivos (`index.html`, `politica-privacidade.html`, `codigo-etica.html`, `style.css`, `script.js`).
2. **Hospedagem Recomendada:** [Netlify Drop](https://app.netlify.com/drop) (gratuito, com HTTPS automático e CDN global). Arraste a pasta para lá.
3. Configure seu domínio personalizado nas configurações do Netlify/Vercel.

## ⚙️ Configuração de Marketing (Obrigatório)
Abra o `index.html` e substitua os placeholders marcados com `[Sugestão - VALIDAR]`:
- **GA4 ID:** Substitua `G-XXXXXXXXXX`.
- **Google Ads:** Substitua `AW-XXXXXXXXX`.
- **GTM:** Substitua `GTM-XXXXXXX` (aparece 2 vezes: no `<head>` e no `<body>`).
- **Meta Pixel:** Substitua `1234567890`.

*Nota de LGPD:* O `script.js` está configurado para **NÃO** disparar eventos (`gtag`, `fbq`) se o usuário clicar em "Rejeitar Opcionais" no banner de cookies.

## ✅ Checklist de Pré-Lançamento (QA)
- [ ] **Teste de UTM:** Acesse `seusite.com?utm_source=instagram&utm_campaign=promocao`. Clique no WhatsApp. A mensagem deve dizer: *"Vim pelo instagram (Campanha: promocao)..."*.
- [ ] **Acessibilidade:** Navegue pelo site usando apenas a tecla `TAB`. O foco deve ser visível em todos os links e botões.
- [ ] **Mobile:** Abra no celular. A barra inferior ("Ligar" / "WhatsApp") deve aparecer e o botão flutuante deve subir para não ficar em cima dela.
- [ ] **Performance:** Rode o site no [PageSpeed Insights](https://pagespeed.web.dev/). A pontuação deve ser 95+ em Desktop e 90+ em Mobile (graças ao `loading="lazy"`, `decoding="async"` e dimensões explícitas de imagem).
- [ ] **Formulário:** Preencha e envie. Ele deve abrir o WhatsApp com os dados formatados.

## 📈 Plano de Ação de Marketing Local (8 Semanas)
1. **Semana 1:** Reivindicar/Otimizar o Perfil da Empresa no Google. Adicionar fotos reais da fachada e das pizzas. Inserir o link do site.
2. **Semana 2:** Configurar conversões no Google Ads (clique no botão do WhatsApp) e no GA4.
3. **Semana 3:** Lançar campanha de Meta Ads (Raio de 4-6km do Centro de Suzano) com o criativo do "Combo Família".
4. **Semana 4:** Implementar QR Code nas embalagens das pizzas levando para o site, incentivando avaliação no Google em troca de um brinde na próxima compra.
5. **Semana 5-8:** Analisar o relatório de UTMs no WhatsApp para descobrir qual rede social traz mais vendas reais e realocar o orçamento de anúncios para ela.

## 🛠️ Manutenção Futura
- Para adicionar novas pizzas, basta copiar e colar o bloco `<article class="menu-item">...</article>` no `index.html`.
- As imagens estão usando o Unsplash com otimização (`?w=400&q=80`). Para produção final, substitua pelas fotos reais da Olifrans Pizza, convertidas para formato **WebP** para máxima velocidade.