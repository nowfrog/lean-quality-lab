# Lean & Quality Solutions Lab — Sito Web · Design Spec

**Data:** 2026-04-23
**Autore:** Andrea Morana (su richiesta del lab)
**Stato:** Da rivedere

---

## 1. Contesto

Il **Lean & Quality Solutions Lab** è un laboratorio di ricerca, didattica e servizi del Dipartimento di Economia dell'Università degli Studi di Messina (UniME), attivo dal 01/01/2022, coordinato dal Prof. Giuseppe Ioppolo.

Il lab non ha attualmente un sito web proprio. Esiste solo una scheda minima sul portale UniFind CINECA (`unifind.unime.it/resource/laboratory/LAB-0347`). Obiettivo: costruire un sito vetrina moderno che rappresenti degnamente il lab e funga da hub per progetti, team, pubblicazioni e collaborazioni.

Il sito di riferimento per **struttura dei contenuti** (non grafica) è `humhilab.unime.it` — un altro laboratorio UniME con impostazione simile.

## 2. Assunzioni (da confermare)

1. **Stack tecnico:** Astro + Tailwind CSS + GSAP (ScrollTrigger) + Lenis (smooth scroll). Deploy statico.
2. **Lingua:** Bilingue IT/EN **attivo da v1** — switcher in header, routing Astro i18n (`/` italiano, `/en/` inglese). Italiano come lingua di default. Ogni content collection (`projects/`, `team/`, `research-areas/`, `publications/`) avrà versione `.md` in entrambe le lingue, con meccanismo di fallback su IT se la traduzione EN manca.
3. **Deploy target:** non ancora deciso — il build statico sarà compatibile con GitHub Pages, Netlify, Vercel, o hosting UniME tramite upload FTP.
4. **Contenuti:** per progetti PRIN si estraggono da `ceipsapnrr.github.io` e `hsmaceprin22.github.io`. Per GAL si usano info pubbliche + placeholder. Testi, foto, bio dei membri verranno forniti dal lab successivamente.
5. **Membri core (pagina Team):** solo Giuseppe Ioppolo, Antonio Licastro, Carlotta D'Alessandro, Andrea Morana. I collaboratori accademici dei progetti PRIN (Calabrò, Caristi, Ciliberto, Arbolino, De Chiara, Lopes, De Simone, Russo, Coscia, Szopik-Depczyńska) appaiono **esclusivamente** nelle pagine dei singoli progetti come team del progetto — non nel Team del lab.
6. **Foto team:** per i membri core e per i collaboratori PRIN, si riusano le foto pubblicate sui siti dei due progetti PRIN (`hsmaceprin22.github.io`, `ceipsapnrr.github.io`), previa verifica di liceità/licenza. Vengono scaricate, ottimizzate (WebP/AVIF) e servite localmente — nessun hotlink.
7. **Link accademici per ogni membro:** ORCID, Google Scholar, Scopus, ResearchGate, LinkedIn, email istituzionale. Pagina personale UniME (UniFind / archivio) dove esistente.

## 3. Goal del sito

**Primari:**
- Presentare il laboratorio come realtà scientifica di primo piano nel settore Lean Management / TQM / Circular Economy / Sustainability
- Offrire una pagina dedicata per ciascun progetto (GAL Tirreno Eolie, GAL Etna-Alcantara, PRIN H-SMA-CE, PRIN CE-IPSA)
- Valorizzare il team e le pubblicazioni
- Facilitare contatti per collaborazioni

**Secondari:**
- SEO elevato per ricerche accademiche e istituzionali
- Accessibilità (WCAG AA)
- Performance (Lighthouse >95 su tutti i parametri)
- Esperienza visiva moderna con animazioni non invasive

## 4. Architettura del sito

### 4.1 Sitemap

```
/
├── /                          Home
├── /laboratorio               Il Laboratorio (mission, storia, approccio)
├── /ricerca                   Aree di ricerca (6 pillar)
├── /team                      Team (coordinatore + ricercatori + collaboratori)
├── /progetti                  Landing progetti (griglia)
│   ├── /progetti/h-sma-ce     Dettaglio PRIN H-SMA-CE
│   ├── /progetti/ce-ipsa      Dettaglio PRIN CE-IPSA
│   ├── /progetti/gal-tirreno-eolie   Dettaglio GAL Tirreno Eolie
│   └── /progetti/gal-etna-alcantara  Dettaglio GAL Etna-Alcantara
├── /pubblicazioni             Pubblicazioni (con filtri)
├── /collaborazioni            Partner e reti
└── /contatti                  Contatti + form + mappa
```

### 4.2 Componenti condivisi

- **Nav** sticky trasparente → solida allo scroll
- **Footer** con info lab, contatti, link UniME, privacy, cookie
- **Language switcher** IT/EN — attivo da v1, persistenza scelta in `localStorage`, URL routing `/` (IT) ↔ `/en/` (EN)
- **Cookie banner** (GDPR compliant, minimale)
- **Scroll progress bar** in alto
- **Cursor custom** (opzionale, desktop only)

### 4.3 Struttura dati (Astro Content Collections)

```
src/content/
├── projects/          Markdown file per ogni progetto
├── publications/      Markdown/JSON per pubblicazioni
├── team/              Markdown per ogni membro
└── research-areas/    Markdown per area di ricerca
```

Questo permette a chi gestisce il sito di aggiungere contenuti senza toccare il codice — basta creare un `.md` in `src/content/projects/`.

## 5. Contenuti pagina per pagina

### 5.1 Home (`/`)

- **Hero fullscreen** con:
  - Claim animato carattere per carattere: *"Lean & Quality Solutions Lab"* + sottotitolo *"Innovazione per una transizione sostenibile"*
  - Background: gradient mesh animato + particelle leggere + shape SVG morphing
  - CTA primaria → Progetti, secondaria → Ricerca
  - Scroll indicator animato
- **Sezione "Chi siamo in 3 righe"** con fade-in
- **3 pillar di ricerca** (Lean, Quality, Circular) con card hover tilt
- **Numeri chiave** (anni attivi, progetti, pubblicazioni, membri) con counter animati
- **Progetti in evidenza** — slider orizzontale con i 4 progetti
- **Ultime pubblicazioni** — 3 card
- **CTA finale** → Contatti

### 5.2 Il Laboratorio (`/laboratorio`)

- Mission & vision
- Obiettivi strategici (bullet animati)
- Approccio multidisciplinare
- Timeline dal 2022 a oggi (orizzontale con scroll)
- Affiliazione: Dipartimento di Economia, UniME
- Coordinatore scientifico (card di Ioppolo con link a /team)
- Gallery immagini (opzionale)

### 5.3 Aree di ricerca (`/ricerca`)

6 pillar, ognuno con scheda espandibile:

1. **Lean Manufacturing** — metodologie lean applicate a contesti produttivi moderni
2. **Total Quality Management** — qualità totale, ISO, certificazioni
3. **Circular Economy** — transizione verso modelli circolari
4. **Industry 5.0** — tecnologie digitali per la sostenibilità
5. **Sustainable Local Development** — simbiosi industriale, parchi industriali, borghi storici
6. **Sustainability in Healthcare** — economia circolare nel settore sanitario

Layout: griglia 3×2 con cards che si espandono on-click in modal / drawer con contenuti estesi.

### 5.4 Team (`/team`)

Tre livelli come humhilab ma meglio strutturati:

**1. Scientific Coordinator**
- **Giuseppe Ioppolo** — card estesa con foto, bio, ruolo (Professore Ordinario, Scienze Merceologiche ECON-10/A), insegnamenti (TQM, Tecnologia dei Cicli Produttivi, Gestione della Qualità), h-index, link accademici completi (ORCID, Scholar, Scopus, ResearchGate, LinkedIn), pagina UniME, email.

**2. Ricercatori e dottorandi**
- **Antonio Licastro** — PhD, ricercatore
- **Carlotta D'Alessandro** — PhD, ricercatrice (XXXVI ciclo EMS)
- **Andrea Morana** — Dottorando (PhD student), link alla pagina personale UniME

Per ognuno: foto (estratte dai siti PRIN `hsmaceprin22.github.io` / `ceipsapnrr.github.io` e ottimizzate localmente), ruolo, aree di ricerca, link accademici completi (ORCID, Scholar, Scopus, ResearchGate, LinkedIn), email, pagina UniME dove disponibile.

*Nota: i collaboratori PRIN (Calabrò, Caristi, Ciliberto, Arbolino, ecc.) non sono parte del Team del lab — compaiono solo nelle pagine dei rispettivi progetti.*

### 5.5 Progetti (`/progetti`)

Landing con **griglia animata** (GSAP + ScrollTrigger + hover 3D tilt). Ogni card progetto mostra: logo/immagine, titolo, acronimo, periodo, stato (attivo/concluso), 1-riga descrizione, link a pagina dettaglio.

Filtri: tutti / PRIN / GAL / attivi / conclusi.

### 5.5.1 `/progetti/h-sma-ce`

- **Hero** — titolo completo, acronimo H-SMA-CE, claim
- **Overview** — "A Decision Support System for Sustainable Circular Economy Transition in Italian Historical Small Towns"
- **Info box** — Codice 2022JZLL7J · Budget €250.000 · 2024-2027 · PRIN 2022 NextGenerationEU / MUR
- **Obiettivi** — modello CE per vivibilità/attrattività borghi storici
- **Research Activities** — RA1 Context Analysis · RA2 Circular Scenario · RA3 Method & Modelling · RA4 DSS
- **Case study** — Taurasi (Avellino), DOCG 1993, 17 cantine, viticoltura specializzata
- **Team** — UniME (Ioppolo PI, Calabrò, Caristi, Ciliberto) + Napoli L'Orientale (Arbolino co-PI, Lopes, De Simone, Russo) + Szopik-Depczyńska (Szczecin)
- **Pubblicazioni progetto**
- **Link sito dedicato** → `hsmaceprin22.github.io`

### 5.5.2 `/progetti/ce-ipsa`

- **Hero** — CE-IPSA
- **Overview** — "A Development Model for Circular Economy between Industrial Parks and Surroundings Areas"
- **Info box** — Codice P20227NFA4 · Budget €266.000 · 24 mesi · 2023-2026 · PRIN NextGenerationEU
- **Obiettivi** — Industrial Symbiosis + Circular Economy per efficienza risorse e sostenibilità
- **Research Activities** — RA1 Literature Review · RA2 Context Analysis · RA3 Development Model · RA4 Development Plan · RA5 DSS
- **Case study** — Fosso Imperatore Industrial Park (Nocera Inferiore, Campania)
- **Team** — Napoli L'Orientale lead (Arbolino PI, De Chiara, Lopes, De Simone, Licastro, Coscia) + UniME (Ioppolo co-PI, Calabrò, Caristi, D'Alessandro)
- **Pubblicazioni progetto**
- **Link sito dedicato** → `ceipsapnrr.github.io`

### 5.5.3 `/progetti/gal-tirreno-eolie`

- Hero + claim
- Descrizione: GAL (Gruppo di Azione Locale) che promuove sviluppo locale integrato nord-est Sicilia + arcipelago Eolie
- Ruolo del lab: supporto scientifico / consulenza
- Placeholder per dettagli da arricchire
- Link esterno → `galtirrenoeolie.it`

### 5.5.4 `/progetti/gal-etna-alcantara`

- Hero + claim
- Descrizione: GAL Terre dell'Etna e dell'Alcantara — sviluppo sostenibile area etnea e Valle dell'Alcantara
- Ruolo del lab: supporto scientifico / consulenza
- Placeholder per dettagli da arricchire
- Link esterno → `galetnaalcantara.org`

### 5.6 Pubblicazioni (`/pubblicazioni`)

- **Filtri**: anno, area di ricerca, tipo (journal/conference/book), progetto
- **Lista ordinata** per anno discendente
- **Card pubblicazione**: autori, titolo, rivista, anno, volume, DOI (link), progetto associato, badge open access se applicabile
- **Indicatori bibliometrici Ioppolo** (box laterale): h-index, citazioni Scopus/Scholar, 140+ pubblicazioni

### 5.7 Collaborazioni (`/collaborazioni`)

Tre categorie:

1. **Partner accademici internazionali** — Tsinghua, Tokyo, UC Santa Barbara, Università di Szczecin, Napoli L'Orientale
2. **Partner istituzionali** — UniME Dip. Economia, MUR, CINECA, GAL
3. **Reti scientifiche** — PRIN, Horizon, Interreg, MDPI Sustainability (Editor-in-Chief)

Layout: griglia loghi + card descrittive.

### 5.8 Contatti (`/contatti`)

- Form contatto (nome, email, oggetto, messaggio) con validazione
- Email diretta: `giuseppe.ioppolo@unime.it`
- Indirizzo: Dipartimento di Economia, Piazza Pugliatti 1, Messina
- Mappa (OpenStreetMap / Leaflet embed — no Google Maps per evitare cookie)
- Social links (LinkedIn Ioppolo, ResearchGate, Google Scholar)

## 6. Design visivo

### 6.1 Palette

- **Primario**: Verde industriale profondo (#2D6A4F / #1B4332) — richiama sostenibilità
- **Secondario**: Blu UniME (#003D6A o simile) — istituzionalità
- **Accento**: Oro caldo (#D4A017) — qualità, eccellenza
- **Neutri**: bianco (#FAFAFA), grigio chiaro (#E9ECEF), nero (#0D1117)
- **Dark mode**: scura con stessi accenti

### 6.2 Typography

- **Display / Headings**: Fraunces (serif editoriale con variable font per effetti)
- **Body**: Inter o Space Grotesk (sans-serif geometrico)
- **Monospace** (codici progetto, CUP): JetBrains Mono

### 6.3 Animazioni

**Smooth scroll globale** (Lenis).

**On page load:**
- Hero char-by-char reveal (GSAP SplitText)
- Navbar slide-down
- Scroll indicator bounce

**On scroll (ScrollTrigger):**
- Reveal sezioni (fade + translateY)
- Counter animati numeri chiave
- Parallax immagini
- Progress bar top sticky
- Sticky section con pinning per timeline laboratorio

**On hover:**
- Magnetic buttons (CTA)
- Card tilt 3D (progetti, team)
- Underline animato sui link
- Cursor custom con "view" label su card progetto

**Transitions tra pagine:**
- Astro View Transitions API — shared element transitions fra card progetto e pagina dettaglio

**Altri effetti:**
- Glassmorphism leggero su card
- Noise texture sottile (4% opacity) sullo sfondo
- Gradient mesh animato (lento) nell'hero
- SVG shape morphing
- Dark mode toggle con animazione morph sun→moon

### 6.4 Responsive

Mobile-first. Breakpoint: 640, 768, 1024, 1280, 1536. Animazioni ridotte/disabilitate con `prefers-reduced-motion`.

## 7. Stack tecnico dettagliato

```
Framework:        Astro 5+
Styling:          Tailwind CSS v4
Animazioni:       GSAP 3 + ScrollTrigger + SplitText
Smooth scroll:    Lenis
Icons:            Lucide
Fonts:            Fontsource (self-hosted)
Mappe:            Leaflet + OpenStreetMap
Form:             Astro action + Formspree/Web3Forms
Build:            Vite
Deploy target:    statico (GitHub Pages / Netlify / UniME)
```

## 8. Struttura progetto

```
lab-website/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── images/
│   ├── fonts/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ProjectLayout.astro
│   ├── components/
│   │   ├── ui/               (Button, Card, Badge, ...)
│   │   ├── sections/         (Hero, About, Pillars, ...)
│   │   └── project/          (ProjectCard, ProjectHero, ...)
│   ├── content/
│   │   ├── config.ts
│   │   ├── projects/
│   │   ├── publications/
│   │   ├── team/
│   │   └── research-areas/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── laboratorio.astro
│   │   ├── ricerca.astro
│   │   ├── team.astro
│   │   ├── pubblicazioni.astro
│   │   ├── collaborazioni.astro
│   │   ├── contatti.astro
│   │   └── progetti/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── scripts/
│   │   ├── lenis.ts
│   │   ├── animations.ts
│   │   └── cursor.ts
│   └── styles/
│       ├── global.css
│       └── animations.css
└── README.md
```

## 9. Performance & Accessibility

- Lighthouse target: Performance 95+, Accessibility 100, Best Practices 100, SEO 100
- Lazy loading immagini
- Font subset + `font-display: swap`
- CSS critico inline
- Immagini in formato WebP/AVIF con fallback
- Astro Image component per ottimizzazione automatica
- Semantic HTML5
- ARIA labels dove serve
- Focus visible
- Contrasti minimi AA su tutti i testi
- Rispetto `prefers-reduced-motion`

## 10. Roadmap implementazione

1. **Fase 1 — Setup** · init Astro, Tailwind, config, layout base, nav, footer, temi, Lenis, GSAP registration, **i18n routing IT/EN con language switcher**
2. **Fase 2 — Home** · hero, sezioni, animazioni chiave
3. **Fase 3 — Pagine statiche** · Laboratorio, Ricerca, Team, Contatti
4. **Fase 4 — Sistema progetti** · content collection, landing, template dinamico per singolo progetto
5. **Fase 5 — Contenuti progetti** · 4 file markdown con info estratte (H-SMA-CE, CE-IPSA, GAL×2)
6. **Fase 6 — Pubblicazioni & Collaborazioni** · con filtri e dati reali
7. **Fase 7 — Rifiniture** · microinterazioni, dark mode, transitions, cursor custom
8. **Fase 8 — QA** · Lighthouse, test mobile, prefers-reduced-motion, dev review

## 11. Out of scope (v1)

- CMS headless (Strapi/Sanity) — contenuti in Markdown sono sufficienti
- Ricerca full-text
- Sistema di commenti
- Area riservata
- Blog / News
- Integrazione diretta Scopus/Scholar (dati manuali periodici)

## 12. Rischi e mitigazioni

| Rischio | Mitigazione |
|---------|-------------|
| Contenuti definitivi mancanti (foto team, testi bio) | Usare placeholder realistici + struttura per facilitare sostituzione |
| Info sui GAL limitate | Pagine generiche basate su info pubbliche, chiare come "placeholder" |
| Performance animazioni su device low-end | `prefers-reduced-motion` + throttling GSAP + controllo FPS |
| Adattamenti futuri al branding UniME | Design token centralizzati (CSS variables) per rebranding veloce |

---

## Decisioni aperte da risolvere in fase di implementazione

- Palette definitiva (da confermare con screenshot prototipi)
- Foto team: estrazione e riuso da siti PRIN (`hsmaceprin22.github.io`, `ceipsapnrr.github.io`) — verifica licenze
- Logo del lab: 3 concept SVG disponibili in `design/logo-concepts/` — scelta da confermare
- Hosting definitivo
- Lista completa pubblicazioni del lab
- Traduzioni EN: prima passata da AI, revisione finale da team (contenuti specialistici)
- URL pagina UniME per Andrea Morana (e altri membri, dove esistente) — da fornire

---

*Fine spec. Rivedere e confermare prima di passare al piano di implementazione.*
