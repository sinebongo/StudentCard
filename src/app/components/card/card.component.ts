import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @ViewChild('contents', { static: true }) el!: ElementRef<HTMLImageElement>;

  name: string;
  surname: string;
  grade: string;
  link: string;

  constructor(
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe((param) => {
      this.name = param['name'];
      this.surname = param['surname'];
      this.grade = param['grade'];

      // Generate the QR code link using an external function
      this.link = this.generateCardValidationLink(
        'https://itpstudentcard.netlify.app',
        this.name,
        this.grade
      );
    });
  }

  // External function to generate the full card validation link
  generateCardValidationLink(baseURL: string, name: string, grade: string): string {
    return `${baseURL}/card-validation?name=${encodeURIComponent(name)}&grade=${encodeURIComponent(grade)}`;
  }

  /**
   * Export the card to PDF
   */
  ExportToPdf() {
    html2canvas(this.el.nativeElement).then((canvas) => {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
  
      pdf.addImage({
        imageData: canvas.toDataURL('image/png'),
        format: 'PNG',
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
      });
  
      pdf.save(`${this.name}_card.pdf`);
    });
  }
  


  /**
   * Handle back navigation
   */
  BackTohome() {
    const ok = window.confirm('Are you sure you want to exit? The data you have won’t be saved');
    if (ok) {
      this.route.navigate(['/Home']);
    }
  }
}
