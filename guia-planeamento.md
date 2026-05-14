# Guia Prático: 20 Pontos para um Evento "Sem Ruído"
**Por Gentle Laughter — Coordenação e Produção Premium**

Este checklist foi desenhado para produtores, marcas e clientes privados que não admitem falhas. "Sem Ruído" significa que a logística é invisível e o resultado é impecável.

---

### I. Planeamento e Estrutura (A Fundação)
1.  **Interlocutor Único:** Garanta que todas as decisões passam por uma só pessoa. O ruído nasce da fragmentação da comunicação.
2.  **Rider Técnico Validado:** Nunca assuma que o local tem o que promete. Valide potências elétricas, pontos de água e acessos de carga.
3.  **Janela de Montagem Realista:** O erro mais comum é subestimar o tempo de "load-in". Adicione sempre 20% de margem de segurança.
4.  **Plano de Contingência (Plano B):** Se o evento é ao ar livre, o plano para chuva deve estar contratado, não apenas "pensado".
5.  **Mapa de Frequências:** Num evento com muitos rádios e microfones, a gestão de frequências evita interferências críticas no áudio.

### II. Logística e Equipa (O Motor)
6.  **Briefing de "Dress Code" e Conduta:** A equipa técnica deve ser invisível. Roupa preta (show blacks), sem logos berrantes e conduta discreta.
7.  **Catering de Equipa:** Uma equipa bem alimentada resolve problemas; uma equipa faminta cria-os. Planeie as pausas.
8.  **Gestão de Acessos (Backstage):** Controle rigorosamente quem entra na zona técnica. Ruído visual e humano atrás do palco distrai o artista/orador.
9.  **Transporte de "Last Minute":** Tenha sempre um motorista de reserva para compras de última hora ou transferes imprevistos.
10. **Comunicação por Rádio:** Use auriculares. O som dos rádios a "chiar" no meio do público é o oposto de um evento premium.

### III. Efeitos e Técnica (O Espetáculo)
11. **Sincronização de Régie:** Luz, som e efeitos especiais devem ser testados em conjunto. O "cue" deve ser claro e único.
12. **Segurança de Pirotecnia:** Licenciamento e extintores no local são obrigatórios. O ruído da insegurança destrói a reputação.
13. **Teste de Som "Invisível":** Realize os testes antes da abertura de portas. Nada quebra mais o ambiente do que um "check 1, 2" com convidados na sala.
14. **Cenografia Estática:** Garanta que painéis e estruturas estão fixos. Ruído de materiais a abanar transmite falta de rigor.
15. **Backup de Energia:** UPS para a régie e geradores para som/luz em eventos críticos.

### IV. Detalhes que Elevam (O Toque Gentle Laughter)
16. **Resposta em Tempo Real:** Use um grupo de coordenação rápido (WhatsApp/Signal) apenas para os decisores.
17. **Limpeza Contínua:** O lixo técnico (caixas, cabos espalhados) deve ser removido imediatamente após a montagem.
18. **Gestão de Expectativas do Artista:** Um artista confortável e com o rider respeitado entrega uma performance superior.
19. **Desmontagem Silenciosa:** O evento não acaba no aplauso. A desmontagem deve ser tão profissional e discreta como a montagem.
20. **Debriefing Pós-Evento:** Analise o que falhou. O próximo evento sem ruído começa na análise do anterior.

---
**Precisa de ajuda para implementar este checklist?**
Fale connosco. Tratamos de todos os pontos para que não tenha de se preocupar com nenhum.
[www.gentlelaughter.com](https://www.gentlelaughter.com)

---
---

# [INTERNO — NÃO PUBLICAR] Plano de melhorias do website

> Conteúdo abaixo é nota interna de planeamento. **Remover antes de exportar este ficheiro como lead-magnet PDF.**

## Contexto

Site estático HTML/CSS/JS, branch `main` limpo e sincronizado com origin. PRODUCT.md define: registo brand, "index não catálogo", luz + escuro iguais, WCAG AA, voz PT direta. Plano sintetiza três revisões paralelas (auditoria técnica, crítica de design, IA/conversão) mais correção do utilizador: **agenciamento é exclusivamente fado PT — não "internacional / PALOP" — e o novo álbum lançado com apoio da Gentle Laughter deve ser o destaque editorial dessa página**.

Site é **construído à mão e coerente com a marca** — sem AI slop, sem anti-padrões banidos, voz on-brand. Lacuna é **execução incompleta**: dark mode em falta, focus de formulário partido, copy factualmente errada em agenciamento, zero prova social, narrativa do "guarda-chuva" fraca.

### Pontuações combinadas

- Auditoria técnica: **13/20** Aceitável — A11y 3, Perf 2, Theming 3, Responsive 3, Anti-padrões 2.
- Crítica de design (Nielsen): **27/40** Sólido — mais fraco em error prevention/recovery (1–2) e help/docs (2).
- IA / conversão: **6.6/10** Funcional mas incompleto — trust signals 4/10, coerência guarda-chuva 6/10.

---

## Issues prioritárias (após correção do utilizador)

### P0 — bloqueia lançamento / factualmente errado

1. **Página agenciamento factualmente errada.** Anuncia "artistas internacionais e dos PALOP" (`agenciamento.html:8, 10, 44, 54, 59`). Correto: agenciamento = **fado PT only**. Reescrever copy, OG/meta, sublist, parágrafo do roster. Adicionar bloco "Novo álbum" destacando o álbum que a Gentle Laughter ajudou a lançar (capa, título, crédito, ano, link de streaming). Vira a âncora de prova social que falta no site inteiro.
2. **Dark mode em falta.** PRODUCT.md exige "luz e escuro iguais". Zero regras `prefers-color-scheme: dark`; gradientes hard-coded `rgba()` (`css/styles.css:63, 323, 811`) não trocam com token.
3. **Outline de focus removido em inputs sem substituição.** `css/styles.css:886–889` faz `outline: none` — utilizadores de teclado não veem foco. Falha WCAG 2.1 SC 2.4.7.
4. **Formspree endpoint pode ainda ser placeholder.** CLAUDE.md avisa `{{FORMSPREE_ENDPOINT}}`; verificar substituição em `formulario.html` e que submissão chega à inbox. Se não substituído, caminho de contacto está partido.

### P1 — credibilidade & acessibilidade

5. **Zero prova de cliente.** Logo cloud na home é `Cliente 01`–`Cliente 05`; bloco "Galeria em breve". Substituir por logos reais e 1–2 case studies (`em falta.md` itens 1, 2, 6). Até logos reais chegarem, **apagar a placeholder cloud em vez de publicar "Cliente 01"**.
6. **Hero background é placeholder.** `assets/hero-background.webp` está mascarado por overlay 85% — lê-se como vazio. Ou comprometer com uma foto decisiva de produção, ou cair só no gradiente.
7. **Touch targets incertos em estados de botão.** Botões a `0.75rem` padding podem cair abaixo de 44px. Confirmar por medição.
8. **Sem lazy loading em imagens.** Adicionar `loading="lazy"` + width/height em todas as `<img>` não-hero.
9. **Sem `robots.txt`, sem `sitemap.xml`, sem schema.org.** Infraestrutura de descoberta em falta.

### P2 — execução de marca & UX

10. **Grid de serviços contradiz "index não catálogo".** `repeat(auto-fill, minmax(320px, 1fr))` reflui imprevisivelmente para 3 ou 4 colunas. Substituir por 3-col estrito ou migrar para padrão de lista expansível já usado nas páginas interiores.
11. **Accent peach não é usado.** Ou comprometer em CTAs secundários / hover de links / linhas de secção, ou tirar o token. Meio-uso é o pior cenário.
12. **Incoerência guarda-chuva — falta página "Sobre / Modelo".** Visitante não percebe porque é que booking de fado e roulote de comida coabitam. Uma página curta (300–400 palavras) + cross-links "frequentemente combinado com" em cada serviço.
13. **Filename do logo `WhatsApp_Image_2026-04-30_at_12.31.01-removebg-previewfinal.png`** — renomear para `logo.png` (e `logo-dark.png` para dark mode).
14. **Repetição transversal.** "Resposta no próprio dia" e "Produção premium" aparecem 5+ vezes — manter uma vez por página.
15. **Itálico Gambarino em `service-card__num`** — italicizar dígitos é reflexo decorativo. Cortar para roman, baixar opacidade.
16. **Backdrop-filter no top nav** — funciona como barra fosca medida, não slop de glass-card, mas confirmar fallback Safari.
17. **Inconsistência label de footer** — "Formulário" vs "Contacto" entre páginas. Escolher uma.

### P3 — polish

18. **Ordem de carregamento do cookie banner** — confirmar `cookie-consent.js` carregado depois de `site.js` per CLAUDE.md.
19. **Cache-buster `?v=` em `styles.css`** — incrementar a cada ship CSS; atual `?v=9`.
20. **Imagem OG dedicada para share cards.**

---

## Sequência recomendada de comandos `/impeccable`

Executar nesta ordem. Cada passo tem briefing específico, não invocação genérica.

1. **`/impeccable clarify` — agenciamento.html (P0 #1).** Reescrever como fado-only PT. Tirar "internacionais", "PALOP", "roster internacional". Adicionar bloco editorial "Novo álbum" acima do "Roster atual" — precisa capa, título, ano, frase de crédito ("Produção e booking por Gentle Laughter"), link de streaming. Atualizar `<title>`, `meta description`, OG. Sublist passa a `Vanessa Alves · Fado` / `Novo álbum [TÍTULO]` / `Booking & rider`. **Inputs do utilizador**: título do álbum, ano, capa, link, frase de crédito, decisão sobre se "PALOP / internacionais" sai de vez ou migra como rodapé "sob consulta" em producao.html.
2. **`/impeccable harden` — dark mode + focus de formulário (P0 #2, #3).** Adicionar `:root[data-theme="dark"]` e `@media (prefers-color-scheme: dark)`. Converter `rgba()` em `css/styles.css:63, 323, 811` para tokens. Restaurar `:focus-visible` ring visível em inputs. Verificar contraste WCAG AA em ambos os modos.
3. **`/impeccable audit` — Formspree + readiness (P0 #4, P1 #9).** Verificar `{{FORMSPREE_ENDPOINT}}`; testar submissão real; confirmar redirect `sucesso.html`. Adicionar `robots.txt`, `sitemap.xml`, JSON-LD `LocalBusiness` + `MusicAlbum` (para o destaque novo) + `Book` (livro.html).
4. **`/impeccable distill` — placeholders + repetição (P1 #5, #6, P2 #14).** Apagar `Cliente 01–05` da home até logos reais. Tirar "Galeria em breve" — ou case study real ou remover bloco. Ou foto decisiva no hero ou só gradiente. Remover repetições de "Resposta no próprio dia" / "Produção premium".
5. **`/impeccable layout` — grid + disciplina de index (P2 #10).** Substituir auto-fill por 3-col estrito, ou migrar para padrão de index expansível. Documentar escolha em DESIGN.md.
6. **`/impeccable colorize` — accent committal (P2 #11).** Decidir: comprometer peach `#fcdcb9` em CTAs secundários + hover + linha de secção, OU tirar e ficar só em ink + paper.
7. **`/impeccable shape` depois `/impeccable craft` — `sobre.html` (P2 #12).** Nova página entre Parceiros e Livro. 300–400 palavras sobre a coerência das 9 linhas. Cross-links "frequentemente combinado com" em cada página de serviço.
8. **`/impeccable typeset` — tipografia (P2 #15).** Roman digits em `service-card__num`. Confirmar medida 65–75ch em todas as páginas.
9. **`/impeccable adapt` — touch targets + responsivo (P1 #7).** Medir cada elemento interativo ≥44×44px em todos os estados. Verificar mobile nav `display:none/flex` em CSS, não JS-only.
10. **`/impeccable optimize` — perf (P1 #8, P3 #19).** `loading="lazy"` + `width`/`height` em `<img>` não-hero. Bump `?v=` a cada ship. Self-host Switzer/Gambarino (woff2). PurgeCSS em CI.
11. **`/impeccable document`** — gerar DESIGN.md a partir do código + tokens novos.
12. **`/impeccable polish`** — passada final pré-launch.

---

## Ficheiros críticos a tocar

| Ficheiro | Tocado em |
|---|---|
| `agenciamento.html` | passo 1 (reescrever copy + bloco álbum) |
| `css/styles.css` | passo 2 (dark + focus), 5 (grid), 6 (accent), 8 (typeset) |
| `index.html` | passo 4 (placeholders), 7 (link sobre), 10 (lazy) |
| `eventos.html`, `prestacao.html`, `producao.html`, `efeitos-especiais.html`, `aluguer.html`, `roulote.html`, `parceiros.html`, `livro.html` | passo 4 (dedupe), 7 (cross-links), 9 (touch), 10 (lazy) |
| `formulario.html` | passo 2 (focus), 3 (Formspree) |
| `sobre.html` (novo) | passo 7 |
| `robots.txt`, `sitemap.xml` (novos) | passo 3 |
| `manifest.json` | possivelmente passo 6 (theme-color em dark) |
| `service-worker.js` | bump cache version a cada ship |
| `DESIGN.md` (novo) | passo 11 |

## Padrões reutilizáveis já no repo

- **Reveal/stagger** (`css/styles.css:1250` + `.reveal .delay-100/200/300`) — reutilizar no bloco do álbum.
- **`.contact-slab`** — reutilizar em `sobre.html`.
- **`.two-col` + `.prose` + `.eyebrow`** — bloco do álbum deve usar isto, não classes novas.
- **`.index-row__sublist`** — reutilizar para sublist do agenciamento.
- **`?intent=` query param em formulario** — reutilizar para "Reservar Vanessa Alves para [data]" CTA do bloco do álbum.

## Verificação end-to-end

1. `npm run serve` e clicar todas as 12 páginas em luz. Trocar OS para escuro; rever cada uma.
2. Navegação por teclado: Tab do header ao footer em `index.html`, `agenciamento.html`, `formulario.html`. Cada elemento focado tem que mostrar ring visível. Sem traps.
3. Submeter `formulario.html` com email real; confirmar que chega e que `sucesso.html` renderiza.
4. Lighthouse mobile + desktop em `index.html` e `agenciamento.html`. Alvo: a11y ≥ 95, perf ≥ 90, SEO = 100.
5. Re-correr `/impeccable audit` e `/impeccable critique` após passo 12. Alvo: audit ≥ 17/20, Nielsen ≥ 33/40.
6. `git grep -n '{{' -- '*.html'` retorna zero hits.
7. View-source em agenciamento.html: zero ocorrências de "internacional" ou "PALOP".

---

# [INTERNO — v2] Plano refinado por 4 lentes (Huashu · UI/UX Pro Max · Taste · Playwright)

> Esta secção sobrescreve a v1 acima onde houver conflito. v1 fica como histórico.

## Decisões resolvidas (conflitos entre lentes)

- **Cor**: ink + paper site-wide. **Sem accent.** Peach `#fcdcb9` removido (plan v1 #11 → decidido: tirar). Album block recebe **um único drench burgundy `#3d1820`** — não como accent, como material da secção. Burgundy aparece em ZERO outros sítios. Esta é a regra de disciplina que faz a secção significar.
- **Tipografia (recomendada, opcional)**: Tenor Sans (display) + Public Sans (body). Open-source, fora da reflex-reject list, voz literária+humanista. Decisão final fica para passo de typeset com mockup.
- **Album block**: estrutura ECM (colophon frio, sem logos de streaming, um link `ouvir` em minúsculas) + gesto Huashu (ano `2026` como numeral cortado pela margem, capa off-center direita 62%, título vertical à esquerda da capa). Os dois são compatíveis: ECM dá a tipografia, Huashu dá a composição.
- **"Resposta no próprio dia" / "Premium" / "24/7" / "silenciosa"**: scrub agressivo, não dedupe. Manter "sem ruído" apenas no título do lead-magnet. Site limpo destas frases.
- **Hero meta trio (Resposta / Modelo / Foco)**: apagar. É hero-metric template em roupa editorial.
- **Festival Tejo · 2025 placeholder**: apagar **agora** (P0), não esperar. Case study fictício destrói credibilidade junto de leitor PT culto.

---

## P0 atualizado

1. **Agenciamento factualmente errado** — mantém. Adicionar bloco álbum como colophon ECM + drench burgundy. Estrutura do bloco:
   ```
   [drench #3d1820, full-bleed]
   [capa off-center direita, 38vw, sem sombra]
   [título vertical à esquerda da capa, vertical-rl, caps espaçadas]
   [ano "2026" bottom-left, ~18rem, cortado pela margem da secção]

   VANESSA ALVES
   *[Título]*
   Edição [editora] · 2026
   Direção de produção: Gentle Laughter

   ouvir
   ```
   Sem "novo álbum lançado com o nosso apoio". Sem ícones Spotify/Apple/Bandcamp em fila. Um link `ouvir` em minúsculas. Se ficha técnica (editora/estúdio/masterização) ainda não está confirmada, o bloco **não está pronto** — melhor ausente que padded.

2. **Dark mode** — mantém. Burgundy `#3d1820` deve passar AA contra ambos os modos (ink/paper invertem; burgundy é constante).

3. **Focus de inputs** — mantém.

4. **Formspree** — mantém. Mas ver P0 #6 abaixo: form vai ser cirurgicamente reduzido, então re-validar Formspree depois da reescrita.

5. **NOVO P0 — Hero rebuild.** Apagar `assets/hero-background.webp` e a referência em `css/styles.css:63`. Reconstruir `index.html:49–71` como split assimétrico 65/35:
   - Esquerda 65%: wordmark em escala display (clamp 9–14rem) com regra hairline `--rule` por baixo (full-width).
   - Direita 35%: spine vertical Switzer-caps `PRODUÇÃO · AGENCIAMENTO · LOGÍSTICA` com `writing-mode: vertical-rl`, 0.78rem, tracking 0.4em.
   - Apagar trio de meta (Resposta / Modelo / Foco).
   - Lede sai do hero e vira primeiro parágrafo da secção seguinte.
   - Substituir copy "Produção premium. Execução silenciosa." por declarativa plana: "Produção, agenciamento e logística. Lisboa, desde [ano]."

6. **NOVO P0 — Reescrita cirúrgica do form.** `formulario.html:64-130` reduzido de 7 → 4+1 campos, nesta ordem:
   1. **Linha de interesse** (primeiro — contexto define tudo)
   2. **Mensagem** (deixar dump de intenção antes de pedir identidade — Baymard pattern, +~10% completion)
   3. **Nome** (campo único; matar `apelido`)
   4. **Contacto** (campo único, aceita tel OU email, parsed client-side; matar a duplicação)
   5. RGPD
   - Apagar "preferência de contacto" (implícito do que escrevem).
   - Inline validation: telefone PT regex on blur, RGPD shake-on-submit, char-count na textarea após 40 chars.

7. **NOVO P0 — Apagar Festival Tejo · 2025** e cloud `Cliente 01–05` da home **agora**. Substituir secção "No Terreno" por nada (whitespace). Vazio é melhor que falso.

---

## P1 atualizado

8. **Pre-fill choreography (`?intent=`, `?line=`)**. Wire em `js/site.js`: cada CTA de service page passa `?intent=<linha>&line=<n>`; form lê params e (a) pré-seleciona `<select>` em `formulario.html:89`, (b) injecta aside header "A pedir sobre: X", (c) seed message placeholder com prompt específico da linha. ~30 LOC. Remove maior fricção do funil.

9. **WhatsApp float vs `.contact-slab`**: auto-hide do float quando `.contact-slab` entra em viewport (IntersectionObserver em `js/site.js`). Dois contactos visíveis em simultâneo = paralisia.

10. **Sticky bottom bar mobile** (≤768px) em service pages longas: esquerda "WhatsApp" texto, direita "Pedir proposta" filled. Substitui o float nessas páginas — mesma função, sem z-index war.

11. **Service-page closer varia por linha**:
    - Booking (agenciamento, eventos): mini-form data + local + headcount.
    - Aluguer: mini-form date range + checkbox de equipamento.
    - Roulote: headcount + tipo de menu.
    - Todos POST para o mesmo form com `?intent=` segmentado.
    - Contact-slab fica como fallback abaixo.

12. **Lineage signals (substitui "Confiam na nossa coordenação")**: uma linha de proveniência no footer ou em Sobre — venues (Coliseu, CCB, São Luiz — só se verdadeiro), editoras, promotores nominais, anos de actividade. Um parágrafo, sem logos. Modelo: nota de programa Carlos do Carmo.

13. **Touch targets ≥44px** — utility único `min-height: 44px` em `.btn`, `.nav-cta`, `.contact-list__value`. Não per-component.

14. **Lazy loading + sitemap + robots + JSON-LD** — mantém v1.

---

## P2 atualizado

15. **Grid de serviços — 9-col asymmetric**, NÃO 3-col estrito (substitui v1 #10):
    - Linhas 01–06 ocupam colunas 1–6, números pendurados na margem como hanging figures (Gambarino roman 3.5rem, oldstyle, opacidade ~40%).
    - Linhas 07, 08, 09 (Roulote, Parceiros, Livro) caem em colunas 4–9 da próxima banda.
    - Negative space em cols 7–9 da primeira banda é o elemento load-bearing.
    - Documentar em DESIGN.md como invariante.

16. **Token `--silence: clamp(8rem, 14vw, 16rem)`** como separador de secção em `index.html` e `agenciamento.html` apenas. Outras páginas usam `--space-*`. Home + álbum respiram ao dobro do ritmo das páginas de trabalho — codifica index/catalogue distinction.

17. **`.spine` utility** (`writing-mode: vertical-rl`, mixed-case caps, tracking 0.4em). Usar **exactamente 3 vezes** site-wide: hero rail direito, álbum left edge, footer running mark. Três é o budget.

18. **Wordmark baseline rule**: `.logo` sempre em baseline rule de 1px `--rule` quando em contextos display (hero, álbum credit). Header fica pequeno e limpo. Footer baseline também.

19. **Scrub tonal site-wide** (substitui v1 #14 "dedupe"):
    - Apagar: *premium*, *silenciosa/sem ruído* (do site, não do PDF), *resposta no próprio dia*, *24/7*, *rigor Gentle Laughter*, *foque-se no essencial*.
    - "Sem ruído" só no título do lead-magnet.

20. **Sobre / FAQ / Legal register**:
    - Sobre: um parágrafo de biografia plana (quem, desde quando, de onde, com quem). Modelo: About da Tinta-da-China, colophon Relógio D'Água. Factos no passado.
    - FAQ: respostas de uma frase, sem preâmbulo, sem "Ótima pergunta!".
    - Legal: PT formal frio de notice RGPD. Não aquecer com "a sua privacidade é importante para nós".

21. **Itálico Gambarino** mantém remoção (v1 #15).

22. **Cores recomendadas (decisão final no passo colorize)**:
    - `--ink: #1F1B16` (warm near-black)
    - `--paper: #F4EFE6` (limewashed cream)
    - `--cal: #E8DDC9` (dividers, hover surfaces)
    - `--rule: color-mix(in oklab, var(--ink) 30%, var(--paper))`
    - `--burgundy: #3d1820` (drench reservada APENAS para álbum)
    - Dark: `--paper: #1A1815`, `--ink: #EDE6D8`, `--burgundy` constante.

23. **Tipografia recomendada**: Tenor Sans (display) + Public Sans (body). Self-hosted woff2.

---

## P3 mantém

Cookie banner load order, `?v=` cache buster, OG image dedicada.

---

## Direção de fotografia (quando chegarem fotos reais)

Briefing para fotógrafo com 3 nomes de referência:
- **Eduardo Gageiro** — load-in e sala vazia, não o aplauso.
- **Daniel Blaufuks** — luz por janela em cima de road case.
- **Augusto Brázio** — mãos do técnico no desk, mid-action, sem contacto visual.

Black & white ou cor desaturada, luz disponível, sem flash, sem fisheye, sem glamour shots de palco, sem flutes de champanhe. Foto do Coliseu vazio às 11h com um road case vale mais que a foto do headline act.

**Proibido**: drone shots, bokeh portraits do fundador, qualquer coisa com confetti no ar.

---

## Sequência v2 dos comandos `/impeccable` + Playwright

Reordenada para meter compositional spine antes de optimização e regression net antes de iteração.

1. **`/impeccable clarify` — agenciamento** (P0 #1 reescrito + bloco álbum colophon+drench). Inputs: título, ano, editora, estúdio, masterização, link "ouvir", ficheiro de capa.
2. **`/impeccable harden` — dark mode + focus** (P0 #2, #3). Tokens incluem `--burgundy`.
3. **NOVO 2.5 `/impeccable shape` then `craft` — hero rebuild** (P0 #5). Lock split assimétrico, spine, wordmark+rule, apagar trio meta, copy declarativa.
4. **NOVO 2.6 `/impeccable distill` — purge agora** (P0 #7). Apagar Festival Tejo, Cliente 01–05, hero-background.webp, hero meta trio, peach token, copy banida (premium / silenciosa / 24-7 / resposta no próprio dia).
5. **NOVO 2.7 `/impeccable harden` — Playwright scaffold**. Setup `@playwright/test` + `@axe-core/playwright`, `playwright.config.ts` com `webServer: npx serve . -l 3000`, projects chromium + webkit + iPhone 13, `tests/` flat. 12 specs ranked por user-impact (smoke, nav, form-via-WhatsApp-popup-then-redirect, WhatsApp float, SW offline, cookie consent, reduced-motion, dark mode, agenciamento "no internacional/PALOP" lock, visual baseline). Axe filtrado a `serious|critical`. GHA workflow mínimo (~4min). Bloqueia regressões nos passos seguintes.
6. **`/impeccable audit` — Formspree + SEO infra** (v1 step 3). Re-validar Formspree depois da reescrita do form (passo 8). Adicionar robots, sitemap, JSON-LD `LocalBusiness` + `MusicAlbum` + `Book`.
7. **`/impeccable layout` — 9-col asymmetric grid** (P2 #15). Hanging numerals, banda 4–9 para linhas 7–9, --silence token.
8. **`/impeccable craft` — form surgery + pre-fill choreography** (P0 #6 + P1 #8). Reduzir form 7→4+1, query-param wire, per-line message seeds.
9. **`/impeccable craft` — service-page closers variados** (P1 #11). Mini-forms por tipo de linha.
10. **`/impeccable craft` — sticky mobile bar + WhatsApp float auto-hide** (P1 #9, #10).
11. **`/impeccable colorize` — fechar paleta** (P2 #22). Decisão final ink + paper + cal + rule + burgundy. Sem accent.
12. **`/impeccable typeset` — Tenor Sans + Public Sans** (P2 #23). Self-host. `.spine` utility (3-uses-only). Wordmark baseline rule. Roman digits.
13. **`/impeccable adapt` — touch targets + responsive** (P1 #13).
14. **`/impeccable optimize` — perf** (lazy loading, font self-host, purge CSS em CI, bump `?v=`).
15. **`/impeccable shape` then `craft` — `sobre.html`** (P2 #20). Um parágrafo plano de biografia.
16. **NOVO 11.5 — Refresh visual baselines do Playwright** depois de todos os passos visuais (1–11).
17. **`/impeccable document` — DESIGN.md** com 9-col grid, .spine triad rule, burgundy-only-for-album rule, baseline-rule do wordmark, --silence token, lista de palavras banidas no copy.
18. **`/impeccable polish`** — passada final.

---

## Ficheiros adicionais a criar

| Ficheiro | Razão |
|---|---|
| `playwright.config.ts` | Passo 2.7 |
| `tests/smoke.spec.ts`, `tests/nav.spec.ts`, `tests/form.spec.ts`, `tests/whatsapp.spec.ts`, `tests/sw-offline.spec.ts`, `tests/cookie.spec.ts`, `tests/reduced-motion.spec.ts`, `tests/dark-mode.spec.ts`, `tests/agenciamento-lock.spec.ts`, `tests/a11y.spec.ts`, `tests/visual.spec.ts` | Passo 2.7 |
| `.github/workflows/playwright.yml` | Passo 2.7 |
| `package.json` | Adicionar deps `@playwright/test`, `@axe-core/playwright`, scripts `test`, `test:ui` |
| `assets/fonts/tenor-sans.woff2`, `assets/fonts/public-sans.woff2` | Passo 12 |

## Anti-overengineering (Playwright)

NÃO testar: internals do Formspree, Lighthouse-CI, screenshots em webkit (só chromium + iPhone 13), internals do SW, link crawler, regras .htaccess (npx serve ≠ Apache), coverage gates. Sub-90s local, sub-4min CI.

## Verificação atualizada

Adiciona:
- `npm test` passa em chromium + webkit + iPhone 13.
- `tests/agenciamento-lock.spec.ts` falha imediatamente se "internacional" ou "PALOP" reaparecer em agenciamento.html.
- `tests/a11y.spec.ts` zero violações `serious|critical` em todas as páginas, em luz e em escuro.
- Visual baselines aprovados manualmente após passo 11.

## Inputs do utilizador necessários (atualizado)

Para passo 1 (álbum):
- Título do álbum.
- Editora.
- Estúdio de gravação.
- Engenheiro de masterização.
- Ano (2026?).
- Capa em alta resolução.
- Link canónico "ouvir" (Bandcamp > Spotify > Apple Music — ordem de preferência por taste).

Para passo 2.5 (hero):
- Ano de fundação da Gentle Laughter (para "Lisboa, desde [ano]").

Para passo 12 (lineage signals):
- Lista factual de venues onde já trabalharam (Coliseu, CCB, São Luiz, Aula Magna, etc — só os que são verdade).
- Editoras / promotores / produtores com quem têm relação nominal.

Para passo 16 (Sobre):
- Um parágrafo de biografia: quem, desde quando, de onde, com quem.
