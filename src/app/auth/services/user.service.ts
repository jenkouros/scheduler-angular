import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    update(password: string) {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        console.log(user);


        return this.http.put<any>(environment.apiUrl + `/Users/update${user.id}`, { 
            password: password, 
            username: user.username
         })
         .pipe(
            map(r => true),
            catchError(err => of(false))
         );
    }
}