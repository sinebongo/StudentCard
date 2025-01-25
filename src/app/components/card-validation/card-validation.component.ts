import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-validation',
  templateUrl: './card-validation.component.html',
  styleUrls: ['./card-validation.component.scss'],
})
export class CardValidationComponent implements OnInit {
  locationMessage: string;
  GEO_CENTER = { lat: -25.746, lng: 28.229 }; // Example: Pretoria, South Africa
  GEO_RADIUS = 100; // Radius in meters

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // Optional: You can log QR data or use it as required
      console.log('QR Data:', params);
    });

    // Validate location on component initialization
    this.validateLocation();
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
