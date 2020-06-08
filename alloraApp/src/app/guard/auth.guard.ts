import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard {

    constructor(private authService: AuthService, private router: Router) { }

    /**
     * 
     * @param route Route to protect.
     * @param state Represents the state of the router at a moment in time.
     * Standard / predefined Angular routing method.
     * Checks current login state of auth.service.
     * Depending on auth.service response allows or denies access to requested route.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isLoggedIn();
    }

}