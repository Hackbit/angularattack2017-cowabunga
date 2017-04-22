import { Location } from './location';

export interface Achievement {
  $key: string;
  name: string;
  description: string;
  imageUrl: string;
  location: Location;
  achievedCount: number;
}
