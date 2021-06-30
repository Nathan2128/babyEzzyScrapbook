import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface AuthResponse {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private authenticatedTokenTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    register(email: string, password: string) {
        return this.http.post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseKey,
        {
            email,
            password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(resp => {
                this.handleAuthentication(resp.email, resp.localId, resp.idToken, +resp.expiresIn);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseKey,
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resp => {
                this.handleAuthentication(resp.email, resp.localId, resp.idToken, +resp.expiresIn);
            })
        );
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'Unknown problem occured!';
        if (errorResponse.error.error.message === 'EMAIL_EXISTS') {
            errorMessage = 'This email exists already!';
        } else if(errorResponse.error.error.message === 'EMAIL_NOT_FOUND') {
            errorMessage = 'User does not exist';
        } else if(errorResponse.error.error.message === 'INVALID_PASSWORD') {
            errorMessage = 'Invalid password';
        }
        return throwError(errorMessage);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const authenticatedUser = new User(email, userId, token, expirationDate);
        this.user.next(authenticatedUser);
        this.handleExpiredToken(expiresIn * 1000);
        localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
    }

    reLogin() {
        const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
        if (!authenticatedUser) {
            return;
        }
        const persistedUser = new User(
            authenticatedUser.email,
            authenticatedUser.id,
            authenticatedUser._token,
            new Date(authenticatedUser._tokenExpirationDate)
        );

        const timeRemaining = new Date(authenticatedUser._tokenExpirationDate).getTime() - new Date().getTime();

        if (persistedUser.token) {
            this.user.next(persistedUser);
            this.handleExpiredToken(timeRemaining);
        }
    }

    handleExpiredToken(expirationTime: number) {
        this.authenticatedTokenTimer = setTimeout(() => {
            this.logout();
        }, expirationTime);
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/authenticate']);
        localStorage.removeItem('authenticatedUser');
        if (this.authenticatedTokenTimer) {
            clearTimeout(this.authenticatedTokenTimer);
        }
        this.authenticatedTokenTimer = null;
    }
}
