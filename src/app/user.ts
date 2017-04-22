import { Achievement } from './achievement';
export interface User {
  name: string;
  photoURL: string;
  achievements: Achievement[];
}
