import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {LOCAL_STORAGE_KEY_ACCESS_TOKEN} from "../constants/localStorageKeys.constant";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN)) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN)}`
                }
            });
        }

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    // navigate /delete cookies or whatever
                    this.router.navigate(['/login']);
                }
                return throwError(err);
            })
        );
    }
}
