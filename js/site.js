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

    /* ----- Mobile nav: in-place overlay using menu.html layout (menu.html stays as no-JS fallback) ----- */
    var navToggle = document.querySelector('.nav-toggle');
    var mainnavSrc = document.getElementById('mainnav');
    if (navToggle && mainnavSrc && !document.body.classList.contains('menu-page')) {
      // Build menu-nav-style structure from #mainnav DOM (preserves current locale).
      var overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      overlay.id = 'nav-overlay';
      overlay.hidden = true;
      overlay.setAttribute('aria-label', 'Navegação');

      var menuNav = document.createElement('nav');
      menuNav.className = 'menu-nav';
      menuNav.setAttribute('aria-label', 'Navegação');
      var topList = document.createElement('ul');
      menuNav.appendChild(topList);

      function firstChildByTag(el, tag) {
        var c = el.firstElementChild;
        while (c) { if (c.tagName === tag) return c; c = c.nextElementSibling; }
        return null;
      }

      Array.prototype.forEach.call(mainnavSrc.children, function (li) {
        if (li.tagName !== 'LI') return;
        var clone;
        if (li.classList.contains('has-dropdown')) {
          var summaryA = firstChildByTag(li, 'A');
          var subList = firstChildByTag(li, 'UL');
          if (!summaryA || !subList) return;
          clone = document.createElement('li');
          clone.className = 'has-sub';
          var details = document.createElement('details');
          var summary = document.createElement('summary');
          summary.textContent = summaryA.textContent.trim();
          details.appendChild(summary);
          var ul = document.createElement('ul');
          Array.prototype.forEach.call(subList.children, function (subLi) {
            if (subLi.tagName !== 'LI') return;
            var subA = subLi.querySelector('a');
            if (!subA) return;
            var nl = document.createElement('li');
            var na = document.createElement('a');
            na.href = subA.getAttribute('href');
            na.textContent = subA.textContent.trim();
            nl.appendChild(na);
            ul.appendChild(nl);
          });
          details.appendChild(ul);
          clone.appendChild(details);
        } else {
          var a = firstChildByTag(li, 'A');
          if (!a) return;
          clone = document.createElement('li');
          var na2 = document.createElement('a');
          na2.href = a.getAttribute('href');
          na2.textContent = a.textContent.trim();
          if (a.classList.contains('nav-cta')) na2.className = 'nav-cta';
          clone.appendChild(na2);
        }
        topList.appendChild(clone);
      });

      overlay.appendChild(menuNav);

      // Footer with IG + WhatsApp (matches menu.html)
      var menuFooter = document.createElement('footer');
      menuFooter.className = 'menu-footer';
      menuFooter.innerHTML =
        '<a href="https://instagram.com/gentlelaughteroficial" target="_blank" rel="noopener noreferrer">Instagram</a>' +
        '<a href="https://wa.me/' + WHATSAPP_NUMBER + '" target="_blank" rel="noopener noreferrer">WhatsApp</a>';
      overlay.appendChild(menuFooter);

      document.body.appendChild(overlay);

      navToggle.setAttribute('role', 'button');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-controls', 'nav-overlay');

      function closeNav() {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        overlay.hidden = true;
      }
      function openNav() {
        document.body.classList.add('nav-open');
        navToggle.setAttribute('aria-expanded', 'true');
        overlay.hidden = false;
      }

      navToggle.addEventListener('click', function (e) {
        e.preventDefault();
        if (document.body.classList.contains('nav-open')) closeNav();
        else openNav();
      });

      overlay.addEventListener('click', function (e) {
        var t = e.target;
        if (t && t.tagName === 'A') closeNav();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('nav-open')) closeNav();
      });
    }

    /* ----- Generic lang switcher (.menu-langs outside menu.html) ----- */
    if (!document.body.classList.contains('menu-page')) {
      var langEl = document.querySelector('.menu-langs');
      if (langEl) {
        var curLang = (document.documentElement.lang || 'pt').toLowerCase();
        var curSpan = langEl.querySelector('[data-current-lang]');
        if (curSpan) curSpan.textContent = curLang.toUpperCase();
        langEl.querySelectorAll('a').forEach(function (a) {
          var isActive = a.getAttribute('data-lang') === curLang;
          a.classList.toggle('is-active', isActive);
          if (a.parentElement) a.parentElement.classList.toggle('is-current', isActive);
          a.addEventListener('click', function (e) {
            e.preventDefault();
            if (isActive) return;
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

      var FIELD_MSG = {
        'f-assunto': { valueMissing: 'Escolha a linha aplicável.' },
        'f-msg': { valueMissing: 'Indique data, local e o que precisa.' },
        'f-nome': { valueMissing: 'Como o tratamos?' },
        'f-contacto': { valueMissing: 'WhatsApp (+351 …) ou email.', typeMismatch: 'Formato não reconhecido.' },
        rgpd: { valueMissing: 'Aceite a Política de Privacidade para continuar.' }
      };
      function showFieldError(input) {
        var id = input.id || input.name;
        var slot = document.getElementById('err-' + id.replace(/^f-/, '')) || form.querySelector('[data-for="' + id + '"]');
        if (!slot) return;
        var v = input.validity;
        var fieldMsgs = FIELD_MSG[id] || {};
        var msg = 'Verifique o valor.';
        if (v.valueMissing) msg = fieldMsgs.valueMissing || 'Campo obrigatório.';
        else if (v.typeMismatch) msg = fieldMsgs.typeMismatch || 'Formato inválido.';
        else if (v.patternMismatch) msg = fieldMsgs.patternMismatch || 'Formato inválido.';
        slot.textContent = msg;
        input.setAttribute('aria-invalid', 'true');
      }
      function clearFieldError(input) {
        var id = input.id || input.name;
        var slot = document.getElementById('err-' + id.replace(/^f-/, '')) || form.querySelector('[data-for="' + id + '"]');
        if (slot) slot.textContent = '';
        input.removeAttribute('aria-invalid');
      }
      form.querySelectorAll('input, select, textarea').forEach(function (inp) {
        inp.addEventListener('input', function () { clearFieldError(inp); });
        inp.addEventListener('blur', function () {
          if (inp.willValidate && !inp.checkValidity()) showFieldError(inp);
        });
      });

      form.addEventListener('submit', function (e) {
        if (form.checkValidity && !form.checkValidity()) {
          e.preventDefault();
          var firstInvalid = null;
          form.querySelectorAll('input, select, textarea').forEach(function (inp) {
            if (inp.willValidate && !inp.checkValidity()) {
              showFieldError(inp);
              if (!firstInvalid) firstInvalid = inp;
            }
          });
          if (firstInvalid) firstInvalid.focus();
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
        var msgText = lines.join('\n');
        var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msgText);

        var status = document.getElementById('formStatus');
        if (status) {
          status.hidden = false;
          status.textContent = 'A abrir WhatsApp…';
        }
        window.open(url, '_blank', 'noopener,noreferrer');
        setTimeout(function () { window.location.href = 'sucesso.html'; }, 600);
      });
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
      var SW_GEN = 'gl-sw-v84';
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
