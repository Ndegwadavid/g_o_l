// src/utils/pdfSetup.js
import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source path
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export { pdfjsLib };