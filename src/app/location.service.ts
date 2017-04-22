import { Injectable } from '@angular/core';
import { Coordinates } from 'app/coordinates';

@Injectable()
export class LocationService {
  location: Coordinates;

  constructor() {
    this.resolveLocation();
  }

  getLocation() {
    if (!this.location) {
      this.resolveLocation();
    }
    return this.location;
  }

  distanceToLocation(location: Coordinates) {
    if (this.location) {
      return this.getDistanceFromLatLonInKm(
        this.location.latitude, this.location.longitude,
        location.latitude, location.longitude
      );
    } else {
      return null;
    }
  }


  private getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  private deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  private resolveLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => this.location = position.coords);
    }
  }
}
