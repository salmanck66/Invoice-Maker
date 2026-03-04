<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# 🪵 Everwood Interior — Billing App

A clean, fully customizable invoice management app built for interior design businesses. Create, edit, preview, and print professional invoices with your own branding.

---

## ✨ Features

- **Invoice Management** — Create, edit, and delete invoices with full history
- **Sectioned Billing** — Organize items into sections (Kitchen, Bedroom, Living Hall, etc.) with individual sub-totals
- **Flexible Pricing** — Add prices per item inside sections (optional), or use a single section total
- **Individual Line Items** — Add standalone items with quantity and price
- **Print / Export PDF** — One-click browser print with a clean A4-ready layout
- **Persistent Storage** — All invoices and settings saved locally, survive page refreshes
- **Full Settings Panel** with 4 tabs:
  - 🏢 **Company** — Name, address, phone, email, GSTIN, currency, footer text
  - 🎨 **Colors** — Header, table, section, and total row colors with live preview
  - 🔤 **Font** — Choose from 5 font styles with visual preview
  - 🖼️ **Logo** — Paste any direct image URL, preview instantly

---

## 📸 Screenshots

> Dashboard → Invoice Editor → Invoice Preview → Print

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/everwood-billing.git
cd everwood-billing
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production

```bash
npm run build
```

---

## 🌐 Deploy to Netlify (Free)

1. Run `npm run build` — this creates a `dist/` folder
2. Go to [netlify.com](https://netlify.com) and sign in
3. Drag and drop the `dist/` folder onto the Netlify dashboard
4. Your app is live instantly at a public URL like `everwood-billing.netlify.app`

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| Lucide React | Icons |
| Browser Storage API | Data persistence |
| CSS-in-JS (inline styles) | Styling |

---

## 📁 Project Structure

```
everwood-billing/
├── src/
│   ├── App.jsx          # Main app — all components in one file
│   └── main.jsx         # Entry point
├── public/
│   └── index.html
├── package.json
└── vite.config.js
```

---

## 🧾 Invoice Structure

Each invoice supports:

```
Invoice
├── Invoice # / Date / Bill To / Address / Notes
├── Sections (e.g. Kitchen Materials, Bedroom 1...)
│   ├── Sub-items (name, qty, optional price)
│   └── Section Total
└── Individual Line Items (name, qty, price)
```

---

## ⚙️ Setup: Quick Start with Vite

```bash
npm create vite@latest everwood-billing -- --template react
cd everwood-billing
npm install lucide-react
```

Replace `src/App.jsx` with the app code, then run `npm run dev`.

---

## 📄 License

MIT — free to use, modify, and distribute.

---

> Built for **Everwood Interior**, Areacode, Malappuram, Kerala.  
> Customizable for any interior design or contracting business.
>>>>>>> ddbb60c47f8b6a37aa89df92a13f5927334b1e5c
