#!/usr/bin/env node
// One-shot generator for Gentle Laughter line pages and legal stubs.
// Re-runnable: overwrites the listed files with fresh chrome + content.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const WHATSAPP_NUMBER = '351961154740';
const WHATSAPP_DISPLAY = '+351 961 154 740';
const EMAIL = 'geral@gentlelaughter.com';
const IG_HANDLE = '@gentlelaughteroficial';
const IG_URL = 'https://instagram.com/gentlelaughteroficial';
const LOGO_BLUE = 'assets/logos/azul-removebg-preview.png';

const WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';

function head(title, description) {
  return `<!doctype html>
<html lang="pt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#fafbfc" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <link rel="icon" href="${LOGO_BLUE}" type="image/png" />
  <link rel="manifest" href="manifest.json" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="css/styles.css?v=2" />
</head>`;
}

const header = `  <header class="site-header">
    <div class="shell site-header__inner">
      <div class="header-tools">
        <button class="nav-toggle" type="button" aria-expanded="false" aria-label="Abrir menu"></button>
      </div>
      <nav class="top-nav" aria-label="Navegação principal">
        <ul>
          <li><a href="index.html">Início</a></li>
          <li><a href="parceiros.html">Parceiros</a></li>
          <li><a href="livro.html">Livro</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="formulario.html">Contacto</a></li>
        </ul>
      </nav>
      <a href="index.html" class="logo-link" aria-label="Gentle Laughter — início">
        <img src="${LOGO_BLUE}" alt="Gentle Laughter" class="logo" />
      </a>
    </div>
  </header>`;

const floatBtn = `  <a href="https://wa.me/${WHATSAPP_NUMBER}" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">${WA_SVG}</a>`;

const footer = `  <footer class="site-footer">
    <div class="shell">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="${LOGO_BLUE}" alt="Gentle Laughter" class="logo" />
          <p class="footer-tagline">Produção, agenciamento e eventos. Disponíveis 24/7. Resposta no próprio dia.</p>
        </div>
        <div class="footer-col">
          <h4>Serviços</h4>
          <ul>
            <li><a href="eventos.html">Eventos</a></li>
            <li><a href="agenciamento.html">Agenciamento</a></li>
            <li><a href="prestacao.html">Prestação</a></li>
            <li><a href="efeitos-especiais.html">Efeitos</a></li>
            <li><a href="producao.html">Produção</a></li>
            <li><a href="aluguer.html">Aluguer</a></li>
            <li><a href="roulote.html">Roulote</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Mais</h4>
          <ul>
            <li><a href="parceiros.html">Parceiros</a></li>
            <li><a href="livro.html">Livro</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="formulario.html">Formulário</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li><a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer">${WHATSAPP_DISPLAY}</a></li>
            <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-meta">
        <span>© <span id="year"></span> Gentle Laughter</span>
        <span><a href="politica-privacidade.html">Privacidade</a> · <a href="politica-cookies.html">Cookies</a> · <a href="termos-condicoes.html">Termos</a></span>
      </div>
    </div>
  </footer>

  <script src="js/site.js" defer></script>
  <script src="js/cookie-consent.js" defer></script>
</body>
</html>
`;

function contactSlab(heading) {
  return `    <section class="contact-slab reveal">
      <div class="shell contact-slab__inner">
        <div class="contact-slab__info">
          <h2 class="contact-slab__heading">${heading}</h2>
          <p class="contact-slab__lede">Resposta no próprio dia. Estamos disponíveis 24/7.</p>
          <div class="contact-slab__cta">
            <a href="formulario.html?intent=book-a-call" class="btn">Marcar Chamada / Book a Call</a>
          </div>
        </div>
        <ul class="contact-list">
          <li>
            <div class="contact-list__lhs">
              ${WA_SVG.replace('<svg', '<svg width="20" height="20"')}
              WhatsApp
            </div>
            <a href="https://wa.me/${WHATSAPP_NUMBER}" class="contact-list__value" target="_blank" rel="noopener noreferrer">${WHATSAPP_DISPLAY}</a>
          </li>
          <li>
            <div class="contact-list__lhs">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" width="20" height="20" aria-hidden="true"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Email
            </div>
            <a href="mailto:${EMAIL}" class="contact-list__value">${EMAIL}</a>
          </li>
        </ul>
      </div>
    </section>`;
}

function pageHero(num, title, lede) {
  return `    <section class="page-hero shell reveal">
      <p class="page-hero__num">${num}</p>
      <h1 class="page-hero__title">${title}</h1>
      <p class="page-hero__lede">${lede}</p>
    </section>`;
}

function linePage({ slug, num, eyebrow, title, lede, sublist, body, contactHeading }) {
  const subItems = sublist.map((s, i) => `            <li class="reveal delay-${(i+1)*100}">${s}</li>`).join('\n');
  
  // Fragment body text: wrap H2 and P in reveal classes if not already wrapped
  const fragmentedBody = body
    .replace(/<h2>(.*?)<\/h2>/g, '<h2 class="reveal">$1</h2>')
    .replace(/<p>(.*?)<\/p>/g, '<p class="reveal">$1</p>');

  return `${head(`${title.replace(/\.$/, '')} — Gentle Laughter`, lede)}
<body>

${header}

  <main>
${pageHero(`${num} · ${eyebrow}`, title, lede)}

    <section class="section shell">
      <div class="two-col">
        <div>
          <p class="eyebrow reveal">No detalhe</p>
          <ul class="index-row__sublist" style="margin-top: 0.8rem;">
${subItems}
          </ul>
        </div>
        <div class="prose">
${fragmentedBody}
        </div>
      </div>
    </section>

${contactSlab(contactHeading)}
  </main>

${floatBtn}

${footer}`;
}

const pages = [
  {
    slug: 'agenciamento',
    num: '02', eyebrow: 'Agenciamento',
    title: 'Agenciamento de artistas.',
    lede: 'Booking de artistas internacionais e dos PALOP, com Vanessa Alves a representar o nosso fado. Riders, transfer, hospitalidade e contrato, fechados por uma só pessoa.',
    sublist: ['Vanessa Alves · Fado', 'Roster internacional', 'PALOP'],
    body: `          <h2>Roster atual</h2>
          <p>Representamos a fadista <strong>Vanessa Alves</strong> em exclusivo. Trabalhamos também, sob consulta, com artistas internacionais e dos PALOP para datas pontuais.</p>
          <h2>O que tratamos</h2>
          <p>Negociação de fee, contrato, rider técnico, alojamento, transfer, refeição e backline local. O artista chega para tocar, o promotor não tem de pensar no resto.</p>
          <h2>Para promotores</h2>
          <p>Disponibilidade e propostas em 24 horas. Para datas próximas, normalmente em horas.</p>`,
    contactHeading: 'Quer reservar uma data ou pedir uma proposta?'
  },
  {
    slug: 'prestacao',
    num: '03', eyebrow: 'Prestação',
    title: 'Prestação de serviço.',
    lede: 'Equipas operacionais para produções de outras empresas: stagehands para montagens e desmontagens, motoristas e transfer para artistas e equipa.',
    sublist: ['Stagehands', 'Transfer', 'Motoristas'],
    body: `          <h2>Stagehands</h2>
          <p>Equipas dimensionadas à dimensão da produção. Pontuais, fardadas, com experiência em palco, festival e tour. Ferramenta básica incluída.</p>
          <h2>Transfer e motoristas</h2>
          <p>Para artistas, equipa técnica ou convidados. Viaturas próprias e parceiras, motoristas com TVDE quando exigido.</p>
          <h2>Como contratar</h2>
          <p>Indique a data, o local e o número de pessoas. Confirmamos em horas.</p>`,
    contactHeading: 'Tem uma produção a precisar de mãos?'
  },
  {
    slug: 'efeitos-especiais',
    num: '04', eyebrow: 'Efeitos especiais',
    title: 'Efeitos especiais.',
    lede: 'Pirotecnia fria, jactos de CO₂, fumos pesados e leves, confetes e streamers. Operação licenciada, sincronizada com música ou cue de régie.',
    sublist: ['Pirotecnia fria', 'CO₂ e fumos', 'Confetes e streamers'],
    body: `          <h2>Catálogo</h2>
          <p>Sparklers de palco, jactos de CO₂, máquinas de fumo pesado e leve, hazers, canhões de confetti e streamers manuais ou eléctricos. Combinações desenhadas a pensar na régie.</p>
          <h2>Segurança e licenciamento</h2>
          <p>Operação sempre por técnico com formação. Análise de risco do espaço, planos de contingência, articulação com bombeiros e segurança quando aplicável.</p>
          <h2>Aplicação</h2>
          <p>Concertos, casamentos, lançamentos, festas privadas, eventos corporativos, sessões fotográficas.</p>`,
    contactHeading: 'Que efeito, em que momento da noite?'
  },
  {
    slug: 'producao',
    num: '05', eyebrow: 'Produção',
    title: 'Assistência de produção.',
    lede: 'Efeitos especiais e cenografia para palcos, eventos e festas. Desenho, construção, montagem e operação no dia.',
    sublist: ['Cenografia', 'Coordenação técnica', 'Logística de palco'],
    body: `          <h2>O que cobrimos</h2>
          <p>Da reunião criativa ao desenho técnico, da construção em oficina à montagem em local, da operação durante o evento à desmontagem e reposição. Trabalhamos com produtoras, agências e clientes finais.</p>
          <h2>Cenografia</h2>
          <p>Painéis, fundos, estruturas modulares, peças cenográficas pontuais. Materiais coerentes com o que o palco vai precisar de fazer no dia.</p>
          <h2>Operação no dia</h2>
          <p>Equipa nossa em palco, comunicada por rádio com a régie e com a coordenação geral.</p>`,
    contactHeading: 'Conte-nos a ideia, devolvemos um plano.'
  },
  {
    slug: 'aluguer',
    num: '06', eyebrow: 'Aluguer',
    title: 'Aluguer de equipamento.',
    lede: 'Material que falta sempre à última hora: rádios, baias e extintores, com fatura, entrega e recolha.',
    sublist: ['Rádios (com auriculares)', 'Baias metálicas', 'Extintores certificados'],
    body: `          <h2>Stock</h2>
          <p>Mantemos stock para resposta no próprio dia em Lisboa e arredores. Para outros pontos do país, depende da janela e da quantidade.</p>
          <h2>Inclui</h2>
          <p>Entrega, levantamento, baterias e auriculares para rádios, manutenção entre alugueres. Substituição de unidade defeituosa sem custo.</p>
          <h2>Tarifas</h2>
          <p>Sob consulta, com escalões por número de unidades e número de dias.</p>`,
    contactHeading: 'Quantas unidades, em que dias, e onde?'
  },
  {
    slug: 'roulote',
    num: '07', eyebrow: 'Roulote',
    title: 'Roulote · chamuças e wraps.',
    lede: 'Roulote de chamuças e wraps para festivais, festas privadas e eventos de empresa. Pacote por hora ou por convidado.',
    sublist: ['Chamuças', 'Wraps quentes', 'Pacote para eventos'],
    body: `          <h2>Carta</h2>
          <p>Chamuças vegetarianas e de carne, fritas no momento. Wraps montados ao prato com proteínas, vegetais e molhos próprios. Bebidas frias por adicional.</p>
          <h2>Para eventos</h2>
          <p>Pacote fechado por número de convidados ou por hora de operação. Equipa fardada, faturação completa, montagem autónoma desde que haja acesso a 220V e ponto de água.</p>
          <h2>Para festivais</h2>
          <p>Disponibilidade limitada por época. Contacte com antecedência, sobretudo para Junho a Setembro.</p>`,
    contactHeading: 'Quantos convidados e em que data?'
  }
];

for (const p of pages) {
  const out = linePage(p);
  writeFileSync(resolve(__root, `${p.slug}.html`), out);
}

// Parceiros
writeFileSync(resolve(__root, 'parceiros.html'), `${head('Parceiros — Gentle Laughter', 'Negócios próximos com quem trabalhamos: stand de carros, imobiliária, intermediação de crédito e contabilidade.')}
<body>

${header}

  <main>
${pageHero('08 · Parceiros', 'Parceiros.', 'Negócios próximos, na confiança da casa. Quando precisar do que não fazemos, normalmente conhecemos quem faz.')}

    <section class="section shell">
      <div class="prose reveal" style="max-width: 70ch;">
        <p>Os parceiros abaixo serão preenchidos em breve. Se já tem o contacto da pessoa indicada da nossa parte, fale directamente.</p>

        <h2>Stand de carros <span style="color: var(--ink-soft); font-weight: 400; font-size: var(--text-base);">· em breve</span></h2>
        <p>TODO_PARCEIRO_STAND. Substituir por nome do parceiro, breve descrição, link externo se existir, e contacto principal.</p>

        <h2>Imobiliária <span style="color: var(--ink-soft); font-weight: 400; font-size: var(--text-base);">· em breve</span></h2>
        <p>TODO_PARCEIRO_IMOBILIARIA. Substituir por nome do parceiro, breve descrição, link externo se existir, e contacto principal.</p>

        <h2>Intermediação de crédito <span style="color: var(--ink-soft); font-weight: 400; font-size: var(--text-base);">· em breve</span></h2>
        <p>TODO_PARCEIRO_CREDITO. Substituir por nome do parceiro, breve descrição, link externo se existir, e contacto principal.</p>

        <h2>Contabilidade <span style="color: var(--ink-soft); font-weight: 400; font-size: var(--text-base);">· em breve</span></h2>
        <p>TODO_PARCEIRO_CONTABILIDADE. Substituir por nome do parceiro, breve descrição, link externo se existir, e contacto principal.</p>
      </div>
    </section>

${contactSlab('Quer ser apresentado a um parceiro?')}
  </main>

${floatBtn}

${footer}`);

// Livro
writeFileSync(resolve(__root, 'livro.html'), `${head('A noite de Célio Correia — Gentle Laughter', 'A noite de Célio Correia, livro editado pela Gentle Laughter, à venda na Wook.')}
<body>

${header}

  <main>
${pageHero('09 · Livro', 'A noite de Célio Correia.', 'Editado pela Gentle Laughter. À venda na Wook.')}

    <section class="section shell">
      <div class="two-col">
        <div class="reveal">
          <p class="eyebrow">Edição</p>
          <ul class="index-row__sublist" style="margin-top: 0.8rem;">
            <li>Capa mole</li>
            <li>Português · PT</li>
            <li>Disponível na Wook</li>
          </ul>
        </div>
        <div class="prose reveal">
          <h2>Sobre o livro</h2>
          <p>O livro está disponível directamente na Wook. Para questões editoriais ou pedidos em quantidade, contacte-nos.</p>
          <div style="margin-top: 2rem; display: flex; gap: 0.8rem; flex-wrap: wrap;">
            <a class="btn btn--accent" href="https://www.wook.pt/livro/a-noite-celio-correia/19051244" target="_blank" rel="noopener noreferrer">Comprar na Wook
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="14" height="14" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>
            </a>
            <a class="btn btn--ghost" href="formulario.html">Pedido em quantidade</a>
          </div>
        </div>
      </div>
    </section>

${contactSlab('Quer falar sobre o livro ou pedir em quantidade?')}
  </main>

${floatBtn}

${footer}`);

// Legal stubs
const legalPages = [
  { slug: 'politica-privacidade', title: 'Política de Privacidade', desc: 'Política de privacidade da Gentle Laughter.' },
  { slug: 'politica-cookies',     title: 'Política de Cookies',     desc: 'Política de cookies da Gentle Laughter.' },
  { slug: 'termos-condicoes',     title: 'Termos e Condições',      desc: 'Termos e condições da Gentle Laughter.' }
];

for (const lp of legalPages) {
  writeFileSync(resolve(__root, `${lp.slug}.html`), `${head(`${lp.title} — Gentle Laughter`, lp.desc)}
<body>

${header}

  <main>
${pageHero(lp.title, lp.title + '.', 'Conteúdo legal a ser preenchido. Em caso de dúvida, contacte-nos.')}

    <section class="section shell reveal">
      <div class="prose">
        <p><strong>TODO_${lp.slug.toUpperCase().replace(/-/g,'_')}</strong> · substituir por texto legal definitivo. Esta página existe para que os links no rodapé não devolvam 404.</p>
        <p>Para qualquer questão, escreva para <a href="mailto:${EMAIL}">${EMAIL}</a> ou WhatsApp <a href="https://wa.me/${WHATSAPP_NUMBER}">${WHATSAPP_DISPLAY}</a>.</p>
      </div>
    </section>
  </main>

${floatBtn}

${footer}`);
}

console.log('✓ wrote line pages, parceiros, livro, and 3 legal stubs.');
