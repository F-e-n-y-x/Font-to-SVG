class SVGTextGenerator {
    constructor() {
	this.defaultFonts = ["Wendy One"];
        this.currentFonts = [...this.defaultFonts];
        this.selectedFont = this.defaultFonts[0];
        this.selectedVariant = 'regular';
        this.uploadedFonts = new Map(); // Track uploaded fonts
        this.init();
    }

    async init() {
        console.log('🚀 Initializing SVG Text Generator...');
        this.setupElements();
        this.setupEventListeners();
        this.setupTheme();

        // Load existing fonts from server
        await this.loadExistingFonts();

        // Build dropdown and update preview
        this.buildFontDropdown();
        this.fontSelectDisplayText.textContent = this.selectedFont;  // Show initial font name
        this.updateTextPreview();

        console.log('✅ SVG Text Generator initialized successfully');
    }

    setupElements() {
        // Dropdown elements
        this.fontDropdown = document.getElementById('fontDropdown');
        this.fontSelectDisplay = document.getElementById('fontSelectDisplay');
        this.fontSelectDisplayText = document.getElementById('fontSelectDisplayText');
        this.fontDropdownMenu = document.getElementById('fontDropdownMenu');

        this.variantDropdown = document.getElementById('variantDropdown');
        this.fontVariantDisplay = document.getElementById('fontVariantDisplay');
        this.fontVariantDisplayText = document.getElementById('fontVariantDisplayText');
        this.variantDropdownMenu = document.getElementById('variantDropdownMenu');

        // Other elements
        this.fontSize = document.getElementById('fontSize');
        this.textPreview = document.getElementById('textPreview');
        this.uploadArea = document.getElementById('uploadArea');
        this.fontFileInput = document.getElementById('fontFileInput');
        this.uploadIcon = document.getElementById('uploadIcon');
        this.downloadBtn = document.getElementById('downloadSvg');
        this.themeToggle = document.getElementById('themeToggle');
        this.toast = document.getElementById('toast');

        console.log('✅ Elements setup complete');
    }

    setupEventListeners() {
        // Font dropdown
        this.fontSelectDisplay.addEventListener('click', (e) => this.toggleDropdown(e, this.fontDropdown));

        // Variant dropdown
        this.fontVariantDisplay.addEventListener('click', (e) => this.toggleDropdown(e, this.variantDropdown));

        // Variant selection
        this.variantDropdownMenu.querySelectorAll('.custom-dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                this.selectVariant(item.dataset.value, item.textContent);
            });
        });

        // Font size and text preview
        this.fontSize.addEventListener('input', () => this.updateTextPreview());
        this.textPreview.addEventListener('input', () => this.updateTextPreview());

        // Upload functionality
        this.uploadArea.addEventListener('click', () => this.fontFileInput.click());
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        this.fontFileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        // Download and theme
        this.downloadBtn.addEventListener('click', () => this.downloadSvg());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Close dropdowns on outside click
        document.addEventListener('click', () => this.closeAllDropdowns());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeAllDropdowns();
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        console.log('✅ Event listeners setup complete');
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        this.updateUploadIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateUploadIcon(newTheme);
        this.showToast(`Switched to ${newTheme} theme`, 'success');
    }

    updateUploadIcon(theme) {
        if (this.uploadIcon) {
            this.uploadIcon.src = `assets/icons/upload_${theme}.svg`;
        }
    }

    async loadExistingFonts() {
        try {
            console.log('📁 Loading existing fonts from server...');
            const response = await fetch('/api/fonts');

            if (!response.ok) {
                console.log('⚠️ Could not connect to server, working in offline mode');
                return;
            }

            const data = await response.json();

            if (data.success && data.fonts.length > 0) {
                console.log(`📚 Found ${data.fonts.length} existing fonts on server`);

                for (const fontData of data.fonts) {
                    await this.loadFontInBrowser(fontData);
                }
            } else {
                console.log('📂 No existing fonts found on server');
            }
        } catch (error) {
            console.log('⚠️ Server not available, working in offline mode:', error.message);
        }
    }

    async loadFontInBrowser(fontData) {
    try {
        const encodedURL = encodeURI(fontData.url);
        const fontFace = new FontFace(fontData.fontFamily, `url(${encodedURL})`);
        await fontFace.load();
        document.fonts.add(fontFace);

        if (!fontData.fontFamily) {
            console.warn('⚠️ Font has no name, skipping:', fontData.filename);
            return false;
        }

        this.uploadedFonts.set(fontData.fontFamily, fontData);

        if (!this.currentFonts.includes(fontData.fontFamily)) {
            this.currentFonts.unshift(fontData.fontFamily);
        }

        return true;
    } catch (err) {
        console.error(`❌ Could not load font ${fontData.filename}:`, err);
        return false;
    }
}

    buildFontDropdown() {
        this.fontDropdownMenu.innerHTML = "";

        this.currentFonts.forEach(font => {
            const li = document.createElement('li');
            li.textContent = font;
            li.style.fontFamily = font;
            li.className = "custom-dropdown-item";
            li.tabIndex = 0;
            li.dataset.value = font;

            // Mark uploaded fonts
            if (this.uploadedFonts.has(font)) {
    li.classList.add('uploaded-font');
    li.title = 'Custom uploaded font';
}

            if (font === this.selectedFont) {
                li.classList.add('active');
            }

            li.addEventListener('click', () => {
                this.selectFont(font);
            });

            this.fontDropdownMenu.appendChild(li);
        });

        console.log(`✅ Built font dropdown with ${this.currentFonts.length} fonts`);
    }

    selectFont(font) {
        this.selectedFont = font;
        this.fontSelectDisplayText.textContent = font;

        // Update active state
        this.fontDropdownMenu.querySelectorAll('.custom-dropdown-item').forEach(item => {
            item.classList.toggle('active', item.dataset.value === font);
        });

        this.updateTextPreview();
        this.closeAllDropdowns();
        console.log(`🎨 Selected font: ${font}`);
    }

    selectVariant(variant, displayText) {
        this.selectedVariant = variant;
        this.fontVariantDisplayText.textContent = displayText;

        // Update active state
        this.variantDropdownMenu.querySelectorAll('.custom-dropdown-item').forEach(item => {
            item.classList.toggle('active', item.dataset.value === variant);
        });

        this.updateTextPreview();
        this.closeAllDropdowns();
        console.log(`🎭 Selected variant: ${variant}`);
    }

    toggleDropdown(e, dropdown) {
        e.stopPropagation();
        this.closeAllDropdowns(dropdown);
        dropdown.classList.toggle('open');
    }

    closeAllDropdowns(except = null) {
        document.querySelectorAll('.custom-dropdown.open').forEach(dd => {
            if (dd !== except) {
                dd.classList.remove('open');
            }
        });
    }

    updateTextPreview() {
        let fontWeight = '400', fontStyle = 'normal';

        switch (this.selectedVariant) {
            case 'bold':
                fontWeight = '700';
                break;
            case 'italic':
                fontStyle = 'italic';
                break;
            case 'bold-italic':
                fontWeight = '700';
                fontStyle = 'italic';
                break;
        }

        this.textPreview.style.fontFamily = this.selectedFont;
        this.textPreview.style.fontWeight = fontWeight;
        this.textPreview.style.fontStyle = fontStyle;
        this.textPreview.style.fontSize = this.fontSize.value + 'px';
    }

    // Upload functionality
    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        this.processFiles(files);
    }

    handleFileSelect(e) {
        const files = e.target.files;
        this.processFiles(files);
    }

    async processFiles(files) {
        const fontFiles = Array.from(files).filter(file => {
            const ext = file.name.toLowerCase().split('.').pop();
            return ['ttf', 'otf', 'woff', 'woff2'].includes(ext);
        });

        if (fontFiles.length === 0) {
            this.showToast('Please select valid font files (TTF, OTF, WOFF, WOFF2)', 'error');
            return;
        }

        console.log(`📤 Processing ${fontFiles.length} font file(s)...`);
        this.showToast(`Processing ${fontFiles.length} font file(s)...`, 'success');

        let successCount = 0;
        for (const file of fontFiles) {
            const success = await this.uploadFont(file);
            if (success) successCount++;
        }

        if (successCount > 0) {
            this.showToast(`Successfully uploaded ${successCount} font(s)!`, 'success');
        }
    }

    async uploadFont(file) {
        try {
            console.log(`📤 Uploading font: ${file.name}`);

            // Create FormData for file upload
            const formData = new FormData();
            formData.append('font', file);

            const response = await fetch('/api/upload-font', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                const fontData = data.font;
                console.log(`✅ Font uploaded successfully: ${fontData.fontFamily}`);

                // Load font in browser
                const loaded = await this.loadFontInBrowser(fontData);

                if (loaded) {
                    // Rebuild dropdown and select the new font
                    this.buildFontDropdown();
                    this.selectFont(fontData.fontFamily);
                    return true;
                }
            } else {
                console.error(`❌ Upload failed: ${data.error}`);
                this.showToast(data.error || 'Font upload failed', 'error');
                return false;
            }
        } catch (error) {
            console.error(`❌ Font upload error for ${file.name}:`, error);
            this.showToast(`Failed to upload ${file.name}`, 'error');
            return false;
        }
    }

    async downloadSvg() {
        try {
            const text = this.textPreview.textContent || this.textPreview.innerText || 'Type text here';
            const fontSize = parseInt(this.fontSize.value);

            let fontWeight = 'normal', fontStyle = 'normal';
            switch (this.selectedVariant) {
                case 'bold': fontWeight = 'bold'; break;
                case 'italic': fontStyle = 'italic'; break;
                case 'bold-italic': fontWeight = 'bold'; fontStyle = 'italic'; break;
            }

            console.log(`📥 Generating SVG for text: "${text}"`);

            const response = await fetch('/api/generate-svg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text,
                    fontFamily: this.selectedFont,
                    fontSize,
                    fontWeight,
                    fontStyle
                })
            });

            if (response.ok) {
                const svgContent = await response.text();
                const safeFont = this.selectedFont.replace(/\s+/g, '');
                const safeText = (text || 'Sample').replace(/\s+/g, '').slice(0, 6) || 'Text';
                const filename = `${safeFont}_${safeText}.svg`;

                this.downloadFile(svgContent, filename, 'image/svg+xml');
                this.showToast('SVG downloaded successfully!', 'success');
                console.log('✅ SVG generated and downloaded');
            } else {
                throw new Error('Server SVG generation failed');
            }
        } catch (error) {
            console.error('❌ SVG generation error:', error);
            console.log('🔄 Falling back to client-side generation');

            // Fallback SVG generation
            this.generateFallbackSvg(
                this.textPreview.textContent || 'Type text here',
                parseInt(this.fontSize.value),
                this.selectedVariant.includes('bold') ? 'bold' : 'normal',
                this.selectedVariant.includes('italic') ? 'italic' : 'normal'
            );
        }
    }

    generateFallbackSvg(text, fontSize, fontWeight, fontStyle) {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${this.selectedFont}`;
            const metrics = ctx.measureText(text);
            const width = Math.ceil(metrics.width) + 40;
            const height = fontSize + 40;

            const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <text x="20" y="${fontSize + 10}" 
          font-family="${this.selectedFont}" 
          font-size="${fontSize}" 
          font-weight="${fontWeight}" 
          font-style="${fontStyle}" 
          fill="currentColor">${text}</text>
</svg>`;

            const safeFont = this.selectedFont.replace(/\s+/g, '');
            const safeText = (text || 'Sample').replace(/\s+/g, '').slice(0, 6) || 'Text';
            const filename = `${safeFont}_${safeText}.svg`;

            this.downloadFile(svgContent, filename, 'image/svg+xml');
            this.showToast('SVG downloaded (fallback mode)', 'success');
            console.log('✅ Fallback SVG generated and downloaded');
        } catch (error) {
            console.error('❌ Fallback SVG generation failed:', error);
            this.showToast('Failed to generate SVG', 'error');
        }
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    showToast(message, type = 'info') {
        this.toast.textContent = message;
        this.toast.className = `toast ${type}`;
        this.toast.classList.add('show');

        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SVGTextGenerator();
});
