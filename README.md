# mattiagaratti.github.io

Sito personale di Mattia Garatti, costruito con [Next.js](https://nextjs.org) (export statico) e Tailwind CSS.
Viene pubblicato gratis su GitHub Pages a ogni push su `main`.

## Aggiornare i contenuti (senza toccare il codice)

Tutti i testi stanno in `content/`, un file JSON per pagina:

| File | Cosa contiene |
| --- | --- |
| `content/site.json` | nome, menu, contatti, social, immagini di sfondo delle pagine |
| `content/home.json` | foto e testo "Mathematically me" |
| `content/news.json` | news della home |
| `content/publications.json` | pubblicazioni (con abstract, BibTeX, link) |
| `content/cv.json` | curriculum |
| `content/teaching.json` | corsi, orari, diario delle lezioni, materiali |
| `content/materials.json` | tesi, appunti, altro (pagina Miscellanea) |
| `content/readings.json` | libri consigliati |
| `content/private-lessons.json` | lezioni private |

Immagini in `public/images/`, PDF in `public/documents/`. Nei JSON si scrivono così: `"images/foto.jpg"`, `"documents/file.pdf"`.

### Formattazione nei testi

Nei campi di testo si possono usare:

- `[testo del link](https://...)`: i link esterni e i PDF si aprono in una nuova scheda
- `**grassetto**` e `*corsivo*`

### Esempi rapidi

**Aggiungere una news** (`content/news.json`): l'ordine non conta, vengono ordinate per data in automatico.

```json
{
  "date": "2026-11-20",
  "end": "2026-11-22",
  "image": "images/nuova_foto.jpg",
  "alt": "Descrizione della foto",
  "text": "I gave a talk at [Some Workshop](https://example.org)."
}
```

`end` è facoltativo (serve per gli eventi di più giorni). Le date vanno scritte `AAAA-MM-GG`.

**Aggiungere una pubblicazione** (`content/publications.json`): vengono raggruppate per anno da sole. I link vuoti (`""`) non vengono mostrati.
Ogni pubblicazione ha un link diretto condivisibile: `/publications#<id>`.

**Aggiungere una lezione al diario o un capitolo** (`content/teaching.json`): aggiungi un elemento a `diary.entries` o `chapters.items`.

```json
{ "date": "2026-09-08", "topics": "Upper and lower bounds, supremum and infimum.", "exercises": "TD1 — Exercises 4 to 6." }
```

La data va scritta `AAAA-MM-GG`: il giorno della settimana ("Tuesday 08/09/2026") viene aggiunto da solo e le lezioni sono ordinate automaticamente (la più recente in alto).
Altri campi facoltativi: `"homework"`, `"note"`, `"canceled": true` per una lezione annullata, ed `"exercises"` può essere una lista (una riga per foglio TD).

**Formule LaTeX**: in tutti i testi si possono scrivere `$x^2$` (in linea) e `$$\\lim_{x \\to 0} f(x)$$` (su una riga a parte).
Attenzione: nel JSON ogni backslash va scritto due volte (`\\lim`, `\\frac`, `\\sqrt`…).
Un link materiale con `"href": ""` appare come "coming soon". Con `"hidden": true` puoi nascondere un corso, una lezione o un capitolo senza cancellarlo.

**Immagini pesanti?** Nessun problema: in fase di build vengono create automaticamente versioni WebP leggere (in `public/_img/`, non va committata).

### Modificare direttamente da GitHub

Si può fare tutto dal browser: apri il file JSON su github.com, clicca la matita, salva ("Commit changes").
Dopo circa un minuto il sito è aggiornato. Se un JSON ha un errore (virgola mancante, immagine inesistente, data sbagliata)
la build si ferma con un messaggio chiaro nella tab **Actions** e il sito online resta quello precedente.

## Sviluppo in locale

Serve Node.js 20 o superiore.

```bash
npm install
npm run dev        # http://localhost:3000, si aggiorna mentre modifichi
npm run build      # controlla i contenuti, ottimizza le immagini e genera il sito in out/
npm run preview    # serve la cartella out/ come in produzione
```

## Struttura

```
content/            testi del sito (JSON)
public/images       immagini originali
public/documents    PDF
src/app/            pagine (una cartella per pagina)
src/components/     componenti riutilizzabili (header, footer, card…)
src/lib/            lettura dei contenuti e utility
scripts/            validazione dei contenuti e ottimizzazione immagini
```

La palette (scala di blu di Prussia `prussian-50…950` + accento `glacier`) e i font sono definiti in `src/app/globals.css` (blocco `@theme`).

## Hosting

Il sito è statico (solo HTML/CSS/JS), quindi funziona gratis su:

- **GitHub Pages** (attuale): workflow in `.github/workflows/deploy.yml`.
  Una tantum: *Settings → Pages → Build and deployment → Source: GitHub Actions*.
- **Vercel / Netlify / Cloudflare Pages**: importare il repository, comando di build `npm run build`, cartella di output `out`.
