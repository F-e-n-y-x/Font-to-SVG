<p align="center"><img src="https://raw.githubusercontent.com/F-e-n-y-x/Font-to-SVG/refs/heads/main/logo.svg" width="100" height="100"></p>
<h1 align="center"> Font to SVG Generator </h1>

A modern, professional web app to upload custom fonts and instantly convert text into downloadable scalable vector SVGs using those fonts. Great for designers, devs, and typographers.

![screenshot](https://raw.githubusercontent.com/F-e-n-y-x/Font-to-SVG/refs/heads/main/screenshots/light.png)

---

## 🚀 Features

- **🔤 Custom Font Upload** - Support for TTF, OTF, WOFF, and WOFF2 files (up to 5MB)
- **✍️ Live Preview** - Real-time text editing with full word wrap and cursor support
- **📥 SVG Export** - Generates true vector paths using custom fonts for download
- **☀️🌙 Light & Dark Theme** - Complete theme system with persistence
- **🎛️ Modern Custom Dropdowns** - Smooth animations with no scrollbars
- **📱 Responsive Design** - Mobile-first approach, works perfectly on all devices
- **🔁 Persistent Fonts** - Uploaded fonts are saved across sessions via JSON store
- **🐳 Docker-Ready** - Containerized for easy deployment anywhere

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
├── public/                # Frontend HTML, CSS, Vanilla JS
│   ├── index.html         # Main interface
│   ├── style.css          # Complete styling system
│   ├── app.js             # Application logic
│   └── assets/
│       └── icons/
│           ├── upload_dark.svg
│           └── upload_light.svg
├── uploads/               # Uploaded font files + fonts.json
└── README.md              # This file
```

---

## 🔌 API Endpoints

- `GET /api/fonts` - List all uploaded fonts
- `POST /api/upload-font` - Upload new font file
- `POST /api/generate-svg` - Generate SVG from text

---

## ✨ Technologies Used

### Backend
- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/) - Web server and API endpoints
- [Multer](https://github.com/expressjs/multer) – Secure file upload handling
- [Fontkit](https://github.com/foliojs/fontkit) – Font parsing and validation
- [Text-to-SVG](https://github.com/shrhdk/text-to-svg) – Vector path rendering for SVG export

### Frontend
- **Vanilla JavaScript** - No frameworks, pure performance
- **CSS Custom Properties** - Complete theming system
- **FontFace API** - Modern dynamic font loading

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
