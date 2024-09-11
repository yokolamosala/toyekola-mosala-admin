import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private oktaAuthStateService: OktaAuthStateService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.oktaAuthStateService.authState$.pipe(
      map(authState => {
        if (authState.isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/auth/login']);
          return false;
        }
      })
    );
  }
}