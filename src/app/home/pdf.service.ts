import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generatePDF(content: HTMLElement, filename: string) {
    html2canvas(content).then(canvas => {
      // Convert canvas to PDF
      const pdf = new jspdf.jsPDF();
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'png', 0, 0, imgWidth, imgHeight);
      pdf.save(filename + '.pdf');
    });
  }
}
