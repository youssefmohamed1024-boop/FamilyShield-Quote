/* FamilyShield Quotes — quote-form.js
   Multi-step form: progress, validation, step navigation, success state.
   To go live: replace the submitLead() stub with your CRM/webhook fetch call. */
(function () {
  'use strict';

  const form        = document.getElementById('quoteForm');
  const successEl   = document.getElementById('formSuccess');
  const progressEl  = document.getElementById('progressTrack');
  if (!form) return;

  let currentStep = 1;
  const TOTAL     = 4;

  /* ── Validation rules per step ── */
  const validators = {
    1: () => {
      const coverage = form.querySelector('#q-coverage');
      return validate([
        { el: coverage, test: v => v !== '', msg: 'Please select a coverage amount.' }
      ]);
    },
    2: () => {
      const age = form.querySelector('#q-age');
      const zip = form.querySelector('#q-zip');
      return validate([
        { el: age, test: v => v !== '',       msg: 'Please select your age range.' },
        { el: zip, test: v => /^\d{5}$/.test(v), msg: 'Please enter a valid 5-digit ZIP code.' }
      ]);
    },
    3: () => {
      const fname = form.querySelector('#q-fname');
      const lname = form.querySelector('#q-lname');
      return validate([
        { el: fname, test: v => v.trim().length >= 2, msg: 'Please enter your first name.' },
        { el: lname, test: v => v.trim().length >= 2, msg: 'Please enter your last name.' }
      ]);
    },
    4: () => {
      const email = form.querySelector('#q-email');
      const phone = form.querySelector('#q-phone');
      return validate([
        { el: email, test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
        { el: phone, test: v => v.replace(/\D/g, '').length >= 10,     msg: 'Please enter a valid phone number.' }
      ]);
    }
  };

  function validate(rules) {
    let ok = true;
    rules.forEach(({ el, test }) => {
      const pass = test(el.value);
      el.classList.toggle('error', !pass);
      /* Show/hide the sibling error span */
      const errEl = el.nextElementSibling;
      if (errEl && errEl.classList.contains('form-field-error')) {
        errEl.style.display = pass ? '' : 'block';
      }
      if (!pass) ok = false;
    });
    return ok;
  }

  /* Clear error state on input */
  form.querySelectorAll('.form-control').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const errEl = el.nextElementSibling;
      if (errEl && errEl.classList.contains('form-field-error')) {
        errEl.style.display = '';
      }
    });
  });

  /* ── Progress indicator ── */
  function updateProgress(step) {
    if (!progressEl) return;
    progressEl.querySelectorAll('.progress-step').forEach(dot => {
      const n = parseInt(dot.dataset.step, 10);
      dot.classList.toggle('done',   n < step);
      dot.classList.toggle('active', n === step);
      const dotEl = dot.querySelector('.progress-dot');
      if (dotEl) {
        if (n < step) {
          dotEl.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        } else {
          dotEl.textContent = String(n);
        }
        dotEl.setAttribute('aria-current', n === step ? 'step' : '');
      }
    });
  }

  /* ── Show a step ── */
  function goTo(step) {
    form.querySelectorAll('.form-step').forEach(el => {
      el.classList.toggle('active', parseInt(el.dataset.step, 10) === step);
    });
    currentStep = step;
    updateProgress(step);

    /* Scroll form into comfortable view */
    const card = document.querySelector('.quote-form-card');
    if (card) {
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72', 10);
      const top = card.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  /* ── Next buttons ── */
  form.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.dataset.next, 10);
      if (validators[currentStep] && !validators[currentStep]()) return;
      goTo(next);
    });
  });

  /* ── Back buttons ── */
  form.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', () => {
      const back = parseInt(btn.dataset.back, 10);
      goTo(back);
    });
  });

  /* ── Submit ── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validators[4] && !validators[4]()) return;

    const payload = {
      policyType:     form.querySelector('[name="policyType"]:checked')?.value || '',
      coverageAmount: form.querySelector('#q-coverage')?.value || '',
      ageRange:       form.querySelector('#q-age')?.value || '',
      zip:            form.querySelector('#q-zip')?.value || '',
      tobacco:        form.querySelector('[name="tobacco"]:checked')?.value || '',
      firstName:      form.querySelector('#q-fname')?.value || '',
      lastName:       form.querySelector('#q-lname')?.value || '',
      email:          form.querySelector('#q-email')?.value || '',
      phone:          form.querySelector('#q-phone')?.value || '',
      submittedAt:    new Date().toISOString(),
      source:         window.location.href
    };

    submitLead(payload);
  });

  /* ── Submit stub — replace with real endpoint ── */
  function submitLead(data) {
    /* TODO: swap this for your real endpoint, e.g.:
       fetch('/api/leads', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
       }).then(() => showSuccess()).catch(err => console.error(err));
    */
    console.log('[FamilyShield] Lead payload:', data);
    showSuccess();
  }

  function showSuccess() {
    /* Hide the progress bar and form steps */
    const progressTrack = document.getElementById('progressTrack');
    if (progressTrack) progressTrack.style.display = 'none';
    form.style.display = 'none';

    if (successEl) {
      successEl.classList.add('visible');
      successEl.focus();
    }
  }

  /* Initialize */
  updateProgress(1);

})();
