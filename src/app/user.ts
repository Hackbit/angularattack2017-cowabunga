import { Achievement } from './achievement';
import { Badge } from './badge';
export interface User {
  $key: string;
  name: string;
  photoURL: string;
  achievements: Achievement[];
  badges: Badge[];
}
