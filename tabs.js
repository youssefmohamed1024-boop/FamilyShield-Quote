/* FamilyShield Quotes — tabs.js
   Coverage tabs: click or arrow-key to switch panels */
(function () {
  'use strict';

  const btns   = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  if (!btns.length) return;

  function activate(key) {
    btns.forEach(b => {
      const active = b.dataset.tab === key;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', String(active));
    });
    panels.forEach(p => {
      const active = p.id === 'tab-' + key;
      p.classList.toggle('active', active);
      if (active) {
        p.removeAttribute('hidden');
      } else {
        p.setAttribute('hidden', '');
      }
    });
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => activate(btn.dataset.tab));

    /* Arrow-key navigation */
    btn.addEventListener('keydown', (e) => {
      const all = Array.from(btns);
      const idx = all.indexOf(btn);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        all[(idx + 1) % all.length].focus();
        activate(all[(idx + 1) % all.length].dataset.tab);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        all[(idx - 1 + all.length) % all.length].focus();
        activate(all[(idx - 1 + all.length) % all.length].dataset.tab);
      }
    });
  });

})();
