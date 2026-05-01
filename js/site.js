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

    /* ----- Mobile nav ----- */
    var navToggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.top-nav');
    if (navToggle && nav) {
      navToggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(open));
      });
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* ----- Footer year ----- */
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    /* ----- Active nav link ----- */
    var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.top-nav a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
      if (href === current) a.classList.add('active');
    });

    /* ----- Form to WhatsApp ----- */
    var form = document.getElementById('contactForm');
    if (form) {
      // Check if URL has a specific intent
      var params = new URLSearchParams(window.location.search);
      var isBookCall = params.get('intent') === 'book-a-call';
      
      if (isBookCall) {
        var asideH1 = document.querySelector('.form-aside h1');
        if (asideH1) asideH1.textContent = 'Marcar Chamada. / Book a Call.';
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (form.checkValidity && !form.checkValidity()) {
          form.reportValidity();
          return;
        }
        var data = new FormData(form);
        var nome     = (data.get('nome')     || '').toString().trim();
        var apelido  = (data.get('apelido')  || '').toString().trim();
        var telefone = (data.get('telefone') || '').toString().trim();
        var email    = (data.get('email')    || '').toString().trim();
        var assunto  = (data.get('assunto')  || '').toString().trim();
        var msg      = (data.get('mensagem') || '').toString().trim();

        var lines = [];
        if (isBookCall) {
          lines.push('Olá Gentle Laughter, gostaria de MARCAR UMA CHAMADA:');
        } else {
          lines.push('Olá Gentle Laughter,');
        }
        lines.push('');
        if (nome || apelido) lines.push('Nome: ' + (nome + ' ' + apelido).trim());
        if (assunto)         lines.push('Interesse: ' + assunto);
        if (email)           lines.push('Email: ' + email);
        if (telefone)        lines.push('Telefone: ' + telefone);
        if (msg) {
          lines.push('');
          lines.push('Mensagem: ' + msg);
        }
        var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
        window.open(url, '_blank', 'noopener');

        var status = document.getElementById('formStatus');
        if (status) {
          status.hidden = false;
          status.textContent = 'A abrir o WhatsApp com a sua mensagem. Se nada acontecer, contacte-nos directamente.';
        }
      });
    }

    /* ----- Service worker ----- */
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js').catch(function () { /* ignore */ });
    }
  });
})();
