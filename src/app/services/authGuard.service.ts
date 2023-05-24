import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LOCAL_STORAGE_KEY_ACCESS_TOKEN} from "../constants/localStorageKeys.constant";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(): boolean {
        const token = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);

        if (!token) {
            // If not logged in, redirect to login page
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}
