/**
 * Gentle Laughter — site.js
 * Mobile nav, footer year, active link, theme toggle (persisted),
 * form-to-WhatsApp redirector, service worker registration.
 */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '351961154740';

  document.addEventListener('DOMContentLoaded', function () {

    /* ----- Reveal on scroll ----- */
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      reveals.forEach(function (el) { observer.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ----- Mobile nav: hamburger is now a plain link to menu.html (no JS) ----- */

    /* ----- Generic lang switcher (.menu-langs outside menu.html) ----- */
    if (!document.body.classList.contains('menu-page')) {
      var langEl = document.querySelector('.menu-langs');
      console.log('[lang] init', { langEl: !!langEl, bodyClasses: document.body.className });
      if (langEl) {
        var curLang = (document.documentElement.lang || 'pt').toLowerCase();
        console.log('[lang] curLang =', curLang);
        var curSpan = langEl.querySelector('[data-current-lang]');
        if (curSpan) curSpan.textContent = curLang.toUpperCase();
        var anchors = langEl.querySelectorAll('a');
        console.log('[lang] anchors found:', anchors.length);
        anchors.forEach(function (a) {
          var isActive = a.getAttribute('data-lang') === curLang;
          a.classList.toggle('is-active', isActive);
          if (a.parentElement) a.parentElement.classList.toggle('is-current', isActive);
          a.addEventListener('click', function (e) {
            console.log('[lang] click', { lang: a.getAttribute('data-lang'), href: a.getAttribute('href'), isActive: isActive });
            e.preventDefault();
            if (isActive) return;
            console.log('[lang] navigating to', a.getAttribute('href'));
            location.assign(a.getAttribute('href'));
          });
        });
        document.addEventListener('click', function (e) {
          if (langEl.open && !langEl.contains(e.target)) langEl.open = false;
        });
      }
    }

    /* ----- Footer year ----- */
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    /* ----- Active nav link ----- */
    var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.top-nav a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
      if (href === current) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
        var dropdown = a.closest('.dropdown');
        if (dropdown) {
          var parent = dropdown.parentElement.querySelector(':scope > a');
          if (parent) parent.classList.add('active');
        }
      }
    });

    /* ----- Form to WhatsApp ----- */
    var form = document.getElementById('contactForm');
    if (form) {
      var params = new URLSearchParams(window.location.search);
      var intent = params.get('intent');
      var asideH1 = document.querySelector('.form-aside h1');
      var asideP = document.querySelector('.form-aside p');
      if (intent === 'book-a-call' && asideH1) {
        asideH1.textContent = 'Marcar chamada.';
        if (asideP) asideP.textContent = 'Diga-nos a melhor janela. Confirmamos pelo canal que escolher.';
      } else if (intent === 'guide' && asideH1) {
        asideH1.textContent = 'Receber o guia.';
        if (asideP) asideP.textContent = 'Enviamos o PDF pelo canal indicado.';
      } else if ((intent === 'vanessa-alves' || intent === 'album') && asideH1) {
        asideH1.textContent = 'Reservar Vanessa Alves.';
        if (asideP) asideP.textContent = 'Indique data, local e janela. Tratamos do rider.';
      }

      form.addEventListener('submit', function (e) {
        if (form.checkValidity && !form.checkValidity()) {
          form.reportValidity();
          return;
        }
        e.preventDefault();
        var data = new FormData(form);
        var nome     = (data.get('nome')     || '').toString().trim();
        var contacto = (data.get('contacto') || '').toString().trim();
        var assunto  = (data.get('assunto')  || '').toString().trim();
        var msg      = (data.get('mensagem') || '').toString().trim();

        var lines = [];
        if (intent === 'book-a-call') {
          lines.push('Olá Gentle Laughter, gostaria de marcar uma chamada.');
        } else if (intent === 'guide') {
          lines.push('Olá, gostaria de receber o guia de planeamento.');
        } else if (intent === 'vanessa-alves' || intent === 'album') {
          lines.push('Olá, pedido de reserva — Vanessa Alves.');
        } else {
          lines.push('Olá, tenho interesse na linha: ' + assunto);
        }
        lines.push('');
        if (nome)     lines.push('Nome: ' + nome);
        if (contacto) lines.push('Contacto: ' + contacto);
        if (msg) {
          lines.push('');
          lines.push(msg);
        }
        var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
        window.open(url, '_blank', 'noopener');

        var status = document.getElementById('formStatus');
        if (status) {
          status.hidden = false;
          status.textContent = 'A abrir o WhatsApp com a sua mensagem. Se nada acontecer, contacte-nos directamente.';
        }

        setTimeout(function() {
          window.location.href = 'sucesso.html';
        }, 2000);
      });
    }

    /* ----- Sticky mobile CTA bar (service pages + livro/parceiros) ----- */
    var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var ctaPages = ['eventos.html','agenciamento.html','prestacao.html','efeitos-especiais.html','producao.html','aluguer.html','roulote.html','livro.html','parceiros.html'];
    if (ctaPages.indexOf(page) !== -1 && !document.querySelector('.form-page')) {
      var bar = document.createElement('div');
      bar.className = 'mobile-cta-bar';
      bar.innerHTML = '<a href="formulario.html?intent=book-a-call" class="btn">Marcar chamada</a>';
      document.body.appendChild(bar);
      document.body.classList.add('has-mobile-cta');
      if ('IntersectionObserver' in window) {
        var hideOn = document.querySelectorAll('.contact-slab, .site-footer');
        if (hideOn.length) {
          var barObs = new IntersectionObserver(function (entries) {
            var hide = false;
            entries.forEach(function (e) { if (e.isIntersecting) hide = true; });
            bar.classList.toggle('is-hidden', hide);
          }, { threshold: 0.05 });
          hideOn.forEach(function (t) { barObs.observe(t); });
        }
      }
    }

    /* ----- WhatsApp float autohide near contact slab + footer ----- */
    var float = document.querySelector('.whatsapp-float');
    if (float && 'IntersectionObserver' in window) {
      var hideTargets = document.querySelectorAll('.contact-slab, .site-footer');
      if (hideTargets.length) {
        var hideObs = new IntersectionObserver(function (entries) {
          var anyVisible = false;
          entries.forEach(function (e) { if (e.isIntersecting) anyVisible = true; });
          float.classList.toggle('is-hidden', anyVisible);
        }, { threshold: 0.05 });
        hideTargets.forEach(function (t) { hideObs.observe(t); });
      }
    }

    /* ----- Service worker ----- */
    if ('serviceWorker' in navigator) {
      var SW_GEN = 'gl-sw-v58';
      var register = function () {
        navigator.serviceWorker.register('service-worker.js').catch(function () { /* ignore */ });
      };
      if (window.localStorage && localStorage.getItem('sw-gen') !== SW_GEN) {
        navigator.serviceWorker.getRegistrations().then(function (regs) {
          return Promise.all(regs.map(function (r) { return r.unregister(); }));
        }).then(function () {
          if ('caches' in window) {
            return caches.keys().then(function (keys) {
              return Promise.all(keys.map(function (k) { return caches.delete(k); }));
            });
          }
        }).then(function () {
          try { localStorage.setItem('sw-gen', SW_GEN); } catch (e) {}
          register();
        }).catch(register);
      } else {
        register();
      }
    }
  });
})();
