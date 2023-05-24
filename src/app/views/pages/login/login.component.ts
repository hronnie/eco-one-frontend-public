import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {LOCAL_STORAGE_KEY_ACCESS_TOKEN, LOCAL_STORAGE_KEY_USERNAME} from "../../../constants/localStorageKeys.constant";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    isLoginValid = true;

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
                localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, data.token);
                localStorage.setItem(LOCAL_STORAGE_KEY_USERNAME, this.username);
                this.router.navigate(['/dashboard']);
            },
            err => {
                // Handle error
                this.isLoginValid = false;
                console.log(err);
            }
        );
    }
}
