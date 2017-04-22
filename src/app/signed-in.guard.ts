import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class SignedInGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isSignedIn()) {
      this.router.navigate(['/my-profile']);
    }
    return true;
  }
}
