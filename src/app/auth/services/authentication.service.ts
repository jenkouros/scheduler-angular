import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    isLoggedIn$ = new Subject<boolean>();

    constructor(private http: HttpClient) {
    }

    isUserLoggedIn() {
        return localStorage.getItem('currentUser') != null;
    }

    login(username: string, password: string) {
        return this.http.post<User>(environment.apiUrl + `/Users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.isLoggedIn$.next(true);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this.isLoggedIn$.next(false);
        localStorage.removeItem('currentUser');
    }
}
