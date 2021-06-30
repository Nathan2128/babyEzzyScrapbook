import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginDisplay = true;
    isLoading = false;
    errorMessage: string = null;

    constructor(private authService: AuthService, private router: Router) {}
    onSwitchMode() {
        this.isLoginDisplay = !this.isLoginDisplay;
    }

    onSubmit(authForm: NgForm) {
        const email = authForm.value.email;
        const password = authForm.value.password;

        this.isLoading = true;
        this.isLoginDisplay ? this.login(email, password) : this.signup(email, password);
        authForm.reset();
    }

    login(email: string, password: string) {
        this.authService.login(email, password).subscribe(resp => {
            console.log(resp);
            this.isLoading = false;
            this.router.navigate(['/photo-gallery']);
        },
        errorMessage => {
            this.errorMessage = errorMessage;
            this.isLoading = false;
        });
    }

    signup(email: string, password: string) {
        this.authService.register(email, password).subscribe(resp => {
            console.log(resp);
            this.isLoading = false;
            this.router.navigate(['/photo-gallery']);
        },
        errorMessage => {
            this.errorMessage = errorMessage;
            this.isLoading = false;
        });
    }

    onHandleAlert() {
        this.errorMessage = null;
    }
}
