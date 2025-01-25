import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private pservice: NgxPhotoEditorService,
    private route: Router
  ) {}

  @ViewChild('contents', { static: true }) el!: ElementRef<HTMLImageElement>;

  name: string;
  surname: string;
  grade: string;
  studentNo: string;
  link: string;

  output?: NgxCroppedEvent;

  // Define your allowed geofence location
  GEO_CENTER = { lat: -25.746, lng: 28.229 }; // Example: Pretoria, South Africa
  GEO_RADIUS = 100; // Radius in meters
  locationMessage: string;

  url =
    'https://docs.google.com/forms/d/1m3hZp4VOTL-cCdARU72_67c8bwV2G2twCeDHzhuS0IQ/prefill';

  ngOnInit(): void {
    this.router.queryParams.subscribe((param) => {
      this.name = param['name'];
      this.surname = param['surname'];
      this.grade = param['grade'];
      this.link = `https://your-app.com/card-validation?name=${encodeURIComponent(
        this.name
      )}&grade=${encodeURIComponent(this.grade)}`;
    });

    // Run geolocation validation if navigating to the validation page
    if (this.router.snapshot.routeConfig?.path === 'card-validation') {
      this.validateLocation();
    }
  }

  ExportToPdf() {
    html2canvas(this.el.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 10, 10, 180, 160);
      pdf.save(`${this.name}.pdf`);
    });
  }

  onFileChange($event: any) {
    this.pservice
      .open($event, { aspectRatio: 4 / 3, autoCropArea: 1 })
      .subscribe((data) => {
        this.output = data;
      });
  }

  BackTohome() {
    const ok = window.confirm(
      'Are you sure you want to exit? The data you have won’t be saved'
    );
    if (ok) {
      this.route.navigate(['/Home']);
    }
  }

  /**
   * Validate the user's location against the geofence
   */
  validateLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const distance = this.calculateDistance(
          this.GEO_CENTER.lat,
          this.GEO_CENTER.lng,
          userLat,
          userLng
        );

        if (distance <= this.GEO_RADIUS) {
          this.locationMessage = 'Access granted! You are in the valid area.';
        } else {
          this.locationMessage =
            'Access denied! You are outside the valid area.';
        }
      },
      (error) => {
        this.locationMessage =
          'Unable to get location. Please enable GPS and try again.';
      }
    );
  }

  /**
   * Calculate distance between two coordinates
   */
  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) *
        Math.cos(φ2) *
        Math.sin(Δλ / 2) *
        Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }
}
