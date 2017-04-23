import { Location } from './location';

export interface Achievement {
  $key: string;
  name: string;
  description: string;
  imageUrl: string;
  images: string[];
  location: Location;
  checkInCount: number;
  distance: number;
}
