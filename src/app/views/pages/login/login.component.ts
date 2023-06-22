import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
    LOCAL_STORAGE_KEY_ACCESS_TOKEN,
    LOCAL_STORAGE_KEY_CENTER_DESC, LOCAL_STORAGE_KEY_CENTER_CODE,
    LOCAL_STORAGE_KEY_USERNAME
} from "../../../constants/localStorageKeys.constant";
import {CenterService} from "../../../services/center.service";

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
                private router: Router,
                private centerService: CenterService,
                private route: ActivatedRoute) {
    }

    updateValues() {
        this.username = (<HTMLInputElement>document.getElementById('username')).value;
        this.password = (<HTMLInputElement>document.getElementById('password')).value;
    }

    onSubmit() {
        this.authService.login(this.username, this.password).subscribe({
            next: (data) => {
                localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, data.token);
                localStorage.setItem(LOCAL_STORAGE_KEY_USERNAME, this.username);
                this.centerService.getCenterByUsername(this.username).subscribe({
                    next: (center) => {
                        localStorage.setItem(LOCAL_STORAGE_KEY_CENTER_CODE, center?.code);
                        localStorage.setItem(LOCAL_STORAGE_KEY_CENTER_DESC, <string>center?.description);
                    },
                    error: (error) => {
                        console.log(error);
                    }
                });
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
            },
            error: (err) => {
                this.isLoginValid = false;
                console.log(err);
            }
        });
    }
}
