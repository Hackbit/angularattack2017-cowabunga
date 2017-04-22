import { Achievement } from './achievement';
import { Badge } from './badge';
import { CheckIn } from './check-in';
export interface User {
  $key: string;
  name: string;
  photoURL: string;
  achievements: Achievement[];
  badges: Badge[];
  checkIns: any;
}
