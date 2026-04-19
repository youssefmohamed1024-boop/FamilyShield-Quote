/* FamilyShield Quotes — main.js
   Nav scroll effect, mobile toggle, scroll reveal, FAQ accordion, footer year */
(function () {
  'use strict';

  /* ── Nav: scroll class + mobile toggle ── */
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    /* Close on outside click */
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    /* Close on any nav link click */
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Hero quick-form: redirect to full form ── */
  const heroForm = document.getElementById('heroQuickForm');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const coverage = heroForm.querySelector('#hq-coverage').value;
      const age      = heroForm.querySelector('#hq-age').value;
      const zip      = heroForm.querySelector('#hq-zip').value;

      if (!coverage || !age || !zip || !/^\d{5}$/.test(zip)) {
        heroForm.querySelectorAll('[required]').forEach(el => {
          el.classList.toggle('error', !el.value || (el.id === 'hq-zip' && !/^\d{5}$/.test(el.value)));
        });
        return;
      }

      /* Scroll to the full multi-step form */
      const quoteSection = document.getElementById('quote');
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        /* Pre-fill the full form coverage field if present */
        const fullCoverage = document.getElementById('q-coverage');
        if (fullCoverage) {
          const map = {
            '$100,000':'100000','$250,000':'250000','$500,000':'500000',
            '$750,000':'750000','$1,000,000+':'1000000+'
          };
          fullCoverage.value = map[coverage] || '';
        }
        const fullAge = document.getElementById('q-age');
        if (fullAge) fullAge.value = age;
        const fullZip = document.getElementById('q-zip');
        if (fullZip) fullZip.value = zip;
      }
    });
  }

  /* ── Scroll Reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ── FAQ Accordion ── */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      /* Close all */
      faqItems.forEach(other => {
        other.classList.remove('open');
        const otherBtn = other.querySelector('.faq-question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });
      /* Toggle current */
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Footer year ── */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72', 10);
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
