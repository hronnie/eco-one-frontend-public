import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor(private authService: AuthService,
                private router: Router) {
    }

    updateValues() {
        this.username = (<HTMLInputElement>document.getElementById('username')).value;
        this.password = (<HTMLInputElement>document.getElementById('password')).value;
    }

    onSubmit() {
        this.authService.login(this.username, this.password).subscribe(
            data => {
                localStorage.setItem('access_token', data.token);
                this.router.navigate(['/dashboard']);
            },
            err => {
                // Handle error
                console.log(err);
            }
        );
    }
}
