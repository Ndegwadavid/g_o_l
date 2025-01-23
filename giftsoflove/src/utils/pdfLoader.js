// src/utils/pdfLoader.js
import { pdfjsLib } from './pdfSetup';

export async function loadPDFPreview(pdfPath) {
  try {
    console.log('Attempting to load PDF from:', pdfPath);
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument(pdfPath);
    const pdf = await loadingTask.promise;
    console.log('PDF document loaded successfully');

    // Get the first page
    const page = await pdf.getPage(1);
    console.log('First page loaded');
    
    // Set up rendering
    const scale = 2.0;
    const viewport = page.getViewport({ scale });
    
    // Set up canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Render the page
    const renderTask = page.render({
      canvasContext: context,
      viewport: viewport
    });
    
    await renderTask.promise;
    console.log('Page rendered successfully');
    
    // Convert to image
    const imageData = canvas.toDataURL('image/jpeg', 0.95);
    console.log('Image data generated');
    
    return imageData;
  } catch (error) {
    console.error('Error in loadPDFPreview:', error);
    throw error;
  }
}

// Function to get a specific page
export async function getPDFPage(pdfPath, pageNumber) {
  try {
    const loadingTask = pdfjsLib.getDocument(pdfPath);
    const pdf = await loadingTask.promise;
    
    if (pageNumber > pdf.numPages) {
      throw new Error(`Page ${pageNumber} exceeds PDF length of ${pdf.numPages} pages`);
    }
    
    const page = await pdf.getPage(pageNumber);
    const scale = 2.0;
    const viewport = page.getViewport({ scale });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;
    
    return canvas.toDataURL('image/jpeg', 0.95);
  } catch (error) {
    console.error('Error in getPDFPage:', error);
    throw error;
  }
}