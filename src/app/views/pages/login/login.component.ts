import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor(private authService: AuthService) {
    }

    updateValues() {
        this.username = (<HTMLInputElement>document.getElementById('username')).value;
        this.password = (<HTMLInputElement>document.getElementById('password')).value;
    }

    onSubmit() {
        debugger;
        this.authService.login(this.username, this.password).subscribe(
            data => {
                debugger;
                localStorage.setItem('access_token', data.token);
                // You are logged in. Navigate to another page, etc.
            },
            err => {
                debugger;
                // Handle error
                console.log(err);
            }
        );
    }
}
