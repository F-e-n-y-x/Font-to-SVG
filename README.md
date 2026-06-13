# SVG Text Generator

A modern, professional SVG text generator with custom font upload capabilities and theme support.

## Features

- **Modern Custom Dropdowns** - Smooth animations with no scrollbars
- **Custom Font Upload** - Support for TTF, OTF, WOFF, WOFF2 files
- **Dark/Light Theme** - Complete theme system with persistence
- **SVG Export** - True vector path generation for custom fonts
- **Responsive Design** - Works perfectly on all devices
- **Professional UI** - Clean, modern interface with smooth interactions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   ```
   http://localhost:3000
   ```

## Project Structure

```
svg-text-generator/
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

## Usage

### Uploading Fonts
- Drag and drop font files onto the upload area
- Or click to browse and select files
- Supports TTF, OTF, WOFF, and WOFF2 formats
- Maximum file size: 5MB per font

### Text Editing
- Click on "Type text here" to start editing
- Text updates in real-time with font changes
- Full word wrap and cursor support

### Theme Switching
- Click the theme toggle button (top-right)
- Or use keyboard shortcut: Ctrl+Shift+T
- Theme preference is saved automatically

### SVG Export
- Click "Download SVG" to export your text
- Generates scalable vector graphics
- Custom fonts create true vector paths

## Technical Details

### Backend
- **Express.js** - Web server and API endpoints
- **Multer** - Secure file upload handling
- **OpenType.js** - Font parsing and vector generation

### Frontend
- **Vanilla JavaScript** - No frameworks, pure performance
- **CSS Custom Properties** - Complete theming system
- **FontFace API** - Modern font loading
- **Responsive Design** - Mobile-first approach

### Font Processing
1. File validation and security checking
2. Server-side storage in uploads directory
3. Metadata extraction for proper naming
4. Browser font loading via FontFace API
5. Dynamic dropdown population
6. Vector path generation for SVG export

## API Endpoints

- `GET /api/fonts` - List all uploaded fonts
- `POST /api/upload-font` - Upload new font file
- `POST /api/generate-svg` - Generate SVG from text

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - Feel free to use in your projects!
