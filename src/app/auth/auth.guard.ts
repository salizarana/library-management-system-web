import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('State URL:', state.url);
    const userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.res && user.res.length > 0) {
        const userType = user.res[0].userType;
        if (userType === 'admin') {
          return true;
        } else if (userType === 'user') {
          const restrictedRoutes = [
            '/navigation',
            // '/navigation/user',
            // '/navigation/adduser',
            // '/navigation/book',
            // '/navigation/borrow',
            // '/navigation/payment',
            // '/navigation/dashboard',
          ];
          const requestedRoutes = state.url;
          console.log('Requested Route:', requestedRoutes);
          console.log('Restricted Routes:', restrictedRoutes);
          if (
            restrictedRoutes.some((route) => requestedRoutes.startsWith(route))
          ) {
            this.router.navigate(['/invalid']);
            return false;
          }
          return true;
        }
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
