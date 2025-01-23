// scripts/copyWorker.js
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the worker file in node_modules
const workerPath = join(
  __dirname,
  '../node_modules/pdfjs-dist/build/pdf.worker.min.js'
);

// Destination path in public directory
const destPath = join(__dirname, '../public/pdf.worker.min.js');

// Create directory if it doesn't exist
mkdirSync(dirname(destPath), { recursive: true });

// Copy the file
copyFileSync(workerPath, destPath);
console.log('PDF.js worker file copied successfully!');