import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/UserData';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login-root',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    title = 'alloraApp';
    private mail: string;
    private password: string;
    private jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(public authService: AuthService, public router: Router) { }

    signIn() {
        console.log(this.mail);
        console.log(this.password);

        let model = new UserData(this.mail, this.password);

        this.authService.login(model).subscribe(response => {
            // login successful if there's a jwt token in the response   
            if (response.token && !this.jwtHelper.isTokenExpired(response.token)) {
                // store jwt token in local storage to keep user logged in between page refreshes

                localStorage.setItem('token', response.token);

                this.router.navigate(['/']);
            }
        });
    }
}
