const express = require('express');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const fontkit = require('fontkit');
const TextToSVG = require('text-to-svg');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend from /public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

// Setup storage
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const fontsJsonPath = path.join(uploadsDir, 'fonts.json');
if (!fs.existsSync(fontsJsonPath)) fs.writeFileSync(fontsJsonPath, JSON.stringify([]));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Upload endpoint
app.post('/api/upload-font', upload.single('font'), (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ success: false, error: 'No file uploaded' });

        // ✅ Try opening font to validate
        let font;
        try {
            font = fontkit.openSync(file.path);
        } catch (e) {
            fs.unlinkSync(file.path); // ⛔ delete bad file
            return res.status(400).json({ success: false, error: 'Invalid font file' });
        }

        const fontFamily = font.familyName || path.parse(file.originalname).name;

        let fonts = JSON.parse(fs.readFileSync(fontsJsonPath));
        if (fonts.find(f => f.fontFamily === fontFamily)) {
            fs.unlinkSync(file.path); // cleanup duplicate
            return res.status(400).json({ success: false, error: 'Font already uploaded' });
        }

        const fontEntry = {
            fontFamily,
            filename: file.filename,
            url: `/uploads/${file.filename}`
        };
        fonts.push(fontEntry);
        fs.writeFileSync(fontsJsonPath, JSON.stringify(fonts, null, 2));

        res.json({ success: true, font: fontEntry });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Fetch uploaded fonts
app.get('/api/fonts', (req, res) => {
    try {
        const fonts = JSON.parse(fs.readFileSync(fontsJsonPath));
        res.json({ success: true, fonts });
    } catch {
        res.json({ success: false, fonts: [] });
    }
});

// Generate SVG
app.post('/api/generate-svg', (req, res) => {
    try {
        const { text, fontFamily, fontSize } = req.body;
        const fonts = JSON.parse(fs.readFileSync(fontsJsonPath));
        const font = fonts.find(f => f.fontFamily === fontFamily);
        if (!font) return res.status(404).send('Font not found');

        const fontPath = path.join(uploadsDir, font.filename);
        const textToSVG = TextToSVG.loadSync(fontPath);

        const svg = textToSVG.getSVG(text || '', {
            x: 0, y: 0,
            fontSize: parseInt(fontSize) || 100,
            anchor: 'top',
            attributes: { fill: 'currentColor' }
        });

        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svg);
    } catch (err) {
        console.error('SVG generation error:', err);
        res.status(500).send('SVG generation failed');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at: http://localhost:${PORT}`);
});
