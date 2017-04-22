import { Location } from './location';

export interface Achievement {
  name: string;
  description: string;
  imageUrl: string;
  location: Location;
  achievedCount: number;
}
