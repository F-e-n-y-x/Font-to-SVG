# ![[logo]](https://raw.githubusercontent.com/F-e-n-y-x/Font-to-SVG/refs/heads/main/public/favicon.svg)Font to SVG Generator

A modern web app to upload custom fonts and instantly convert text into downloadable vector SVGs using those fonts. Great for designers, devs, and typographers.

![screenshot](https://raw.githubusercontent.com/F-e-n-y-x/Font-to-SVG/refs/heads/main/screenshots/light.png)

---

## 🚀 Features

- 🔤 Upload and use custom fonts (TTF, OTF, WOFF, WOFF2)
- ✍️ Live preview with selectable font styles
- 📥 Download text as SVG with fonts converted to vector paths
- ☀️🌙 Light & Dark mode ready
- 🔁 Persistent font uploads across sessions (via JSON store)
- 🐳 Docker-ready for deployment anywhere

---

## ⚙️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/F-e-n-y-x/Font-to-SVG.git
cd Font-to-SVG
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm start
```

By default, it runs at: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Docker Setup

To build and run with Docker:

```bash
docker build -t font-svg-generator .
docker run -p 3000:3000 font-svg-generator
```
---

## 💡 Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/F-e-n-y-x/Font-to-SVG/)

---

## 🗂 Project Structure

```
svg-text-generator/
├── dockerfile             # For container deployment
├── server.js              # Express server with upload APIs
├── package.json           # Dependencies and scripts
├── public/                # Frontend files
│   ├── index.html         # Main interface
│   ├── style.css          # Complete styling system
│   ├── app.js             # Application logic
│   └── assets/
│       └── icons/
│           ├── upload_dark.svg
│           └── upload_light.svg
├── uploads/               # Font upload directory
└── README.md              # This file
```

```
/public          → Frontend HTML, CSS, JS
/uploads         → Uploaded font files + fonts.json
server.js        → Express backend
Dockerfile       → For container deployment
```

---

## API Endpoints

- `GET /api/fonts` - List all uploaded fonts
- `POST /api/upload-font` - Upload new font file
- `POST /api/generate-svg` - Generate SVG from text

## ✨ Technologies Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Multer](https://github.com/expressjs/multer) – File uploads
- [Fontkit](https://github.com/foliojs/fontkit) – Font parsing
- [Text-to-SVG](https://github.com/shrhdk/text-to-svg) – SVG path rendering

---

## 📦 Example Output

After typing and styling, clicking **Download SVG** will give:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="...">
  <path d="M12.2..." />
</svg>
```

File name: `Inter_HelloW.svg`

---

## 🛡 License

MIT © [Ayush](https://github.com/F-e-n-y-x)

---

## 🙌 Credits

Inspired by tools like Glyphr, SVGOMG, and Google Fonts.  
Built with love for font nerds & vector lovers. ❤️
