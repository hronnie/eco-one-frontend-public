import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {
        debugger;
        const token = localStorage.getItem('access_token');

        if (!token) {
            // If not logged in, redirect to login page
            this.router.navigate(['/pages/login']);
            return false;
        }

        return true;
    }
}
