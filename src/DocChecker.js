// Step-by-step AI Document Checker in React
// ==========================================
// Make sure you've run: npm install tesseract.js

import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import Tesseract from 'tesseract.js';

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'; // Ensure this path is correct

export default function DocChecker({ file, onResult, mode }) {
  const [validationResult, setValidationResult] = useState('');

  React.useEffect(() => {
    if (!file) {
      setValidationResult('');
      return;
    }
    setValidationResult('Analyse en cours...');

    // If PDF, render first page as image and run OCR
    if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = async function (e) {
        const typedarray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;
        canvas.toBlob(blob => {
          Tesseract.recognize(blob, 'eng+fra+ara', {
            logger: m => console.log(m)
          }).then(({ data: { text } }) => {
            const result = validateDocument(text);
            setValidationResult(result);
            if (onResult) onResult(result);
          });
        }, 'image/png');
      };
      reader.readAsArrayBuffer(file);
      return;
    }
    // Otherwise, run OCR on the original image as-is
    Tesseract.recognize(file, 'eng+fra+ara', {
      logger: m => console.log(m)
    }).then(({ data: { text } }) => {
      const result = validateDocument(text);
      setValidationResult(result);
      if (onResult) onResult(result);
    });
    // eslint-disable-next-line
  }, [file]);

  const validateDocument = (text) => {
    const upperText = text.toUpperCase();
    const cinRegex = /\b[A-Z]{1,2}\d{6}\b/;
    const cinMatch = upperText.match(cinRegex);
    const mrzRegex = /([A-Z0-9<]{44}\n[A-Z0-9<]{44})/g;
    const mrzMatch = upperText.match(mrzRegex);
    const residencyKeywords = /(RESIDENCE|CARTE DE SEJOUR|RÉSIDENCE|PERMIT)/;
    const isResidencyCard = residencyKeywords.test(upperText);
    // Anthropometric fiche keywords (French and Arabic, common forms)
    const anthropoKeywords = /(FICHE ANTHROPOMÉTRIQUE|FICHE ANTHROPOMETRIQUE|ANTHROPOMÉTRIQUE|ANTHROPOMETRIQUE|ANTHROPOMETRIC|البطاقة الأنثروبومترية|البطاقة الانثروبومترية)/;
    const isAnthropoFiche = anthropoKeywords.test(upperText);
    let result = '';
    if (mode === 'fiche') {
      if (isAnthropoFiche) {
        result += `✅ Fiche anthropométrique marocaine détectée\n`;
      } else {
        result = '❌ Aucun format valide de fiche anthropométrique marocaine trouvé.';
      }
    } else {
      if (cinMatch) {
        // Only show the CIN message once, even if multiple matches
        result += `✅ CIN marocaine détectée : ${cinMatch[0]}\n`;
      }
      if (mrzMatch) {
        result += `✅ Passeport (MRZ) détecté\n`;
      }
      if (isResidencyCard) {
        result += `✅ Carte de séjour détectée\n`;
      }
      if (!cinMatch && !mrzMatch && !isResidencyCard) {
        result = '❌ Aucun format valide de CIN, passeport ou carte de séjour trouvé.';
      }
      // Remove duplicate CIN message if regex matches multiple times
      if (cinMatch) {
        // Remove all but the first occurrence
        result = result.replace(/(✅ CIN marocaine détectée : .+\n)+/g, `✅ CIN marocaine détectée : ${cinMatch[0]}\n`);
      }
    }
    return result;
  };

  return (
    <div className="p-2">
      <div>
        <pre className="bg-green-100 p-2 rounded text-sm">{validationResult}</pre>
      </div>
    </div>
  );
}
