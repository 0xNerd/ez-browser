import { createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Ensure assets directory exists
const assetsDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
}

// Generate icon of specified size
function generateIcon(size: number) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Fill with green color (matching popup button)
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, 0, size, size);
    
    // Save the file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(assetsDir, `icon${size}.png`), buffer);
    console.log(`Generated icon${size}.png`);
}

// Generate all icon sizes
[16, 48, 128].forEach(size => generateIcon(size));
console.log('Icon generation complete!');
