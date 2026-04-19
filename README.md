# FamilyShield Quotes

A static, conversion-focused lead-generation website for life insurance quote comparison. Built for clarity, privacy, and zero-pressure messaging — no fake trust signals, no made-up reviews, no stock-photo "founders."

## Stack

- Static HTML / CSS / vanilla JS (no build step)
- Plus Jakarta Sans + Inter from Google Fonts
- Inline SVG icons
- Unsplash imagery via CDN with graceful `onerror` fallbacks

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home — hero, stats band, life stages, coverage tabs, quote form, FAQ preview |
| `how-it-works.html` | 3-step flow + timeline + rights |
| `about.html` | Mission, principles, transparency |
| `faq.html` | Grouped FAQ with anchor pills |
| `contact.html` | Email-only contact form |
| `privacy.html` | Privacy Policy (template — review with counsel) |
| `terms.html` | Terms of Use (template — review with counsel) |
| `disclaimer.html` | Advertising Disclosure (template — review with counsel) |

## Structure

```
familyshield-quotes/
├── index.html
├── about.html
├── how-it-works.html
├── faq.html
├── contact.html
├── privacy.html
├── terms.html
├── disclaimer.html
├── css/
│   └── styles.css
└── js/
    ├── main.js        # Nav toggle, footer year
    ├── quote-form.js  # Multi-step form + validation
    └── tabs.js        # Coverage-type tab switcher
```

## Running locally

No build step — just serve the folder with any static server:

```bash
# Python (simplest)
python3 -m http.server 8000

# Node
npx serve .
```

Then open <http://localhost:8000>.

## Deploying

### GitHub Pages

1. Push this repo to GitHub (see below).
2. Repo **Settings → Pages → Source: `main` branch, `/` root**.
3. Wait ~1 minute. Your site is live at `https://<user>.github.io/<repo>/`.

### Netlify / Vercel / Cloudflare Pages

Point any of these at the repo. Build command: *none*. Publish directory: `.`.

## Pushing to GitHub

After you've created an empty repo on GitHub (e.g. `familyshield-quotes`), run from this folder:

```bash
git init
git add .
git commit -m "Initial commit: FamilyShield Quotes lead-gen site"
git branch -M main
git remote add origin https://github.com/<your-username>/familyshield-quotes.git
git push -u origin main
```

## Lead endpoint

Form submissions are handled client-side with validation in `js/quote-form.js`. To wire up a real backend, edit the `submitLead` stub at the bottom of that file and point it at your endpoint (Formspree, Netlify Forms, your own API, etc.).

## Compliance notes

- The Privacy Policy, Terms of Use, and Advertising Disclosure in this repo are **starting templates**. Review with a licensed attorney before launch.
- The site is built with honest lead-gen disclosure language (footer on every page + a dedicated `disclaimer.html`).
- There are **no** fake BBB seals, customer counts, insurer logos, or testimonial attributions. Testimonial-style cards are explicitly labeled as composite examples.
- Before going live, update governing-law jurisdiction in `terms.html` (currently `[TO BE DEFINED BY OWNER]`).

## License

All rights reserved © 2026 FamilyShield Quotes. Adjust before publishing if you want a different license.
