import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Container } from '../models/container.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponseResult, ApiResponse } from '../../shared/shared.model';
import { switchMap, map, catchError } from 'rxjs/operators';

const dummyContainers: Container[] = [
    {
        code: 'D1',
        id: 1,
        name: 'Delovno mesto D1'
    },
    {
        code: 'D2',
        id: 2,
        name: 'Delovno mesto D2'
    },
    {
        code: 'D3',
        id: 3,
        name: 'Delovno mesto D3'
    },
    {
        code: 'D4',
        id: 4,
        name: 'Delovno mesto D4'
    },
    {
        code: 'D5',
        id: 5,
        name: 'Delovno mesto D5'
    },
];



@Injectable()
export class ContainersService {
    constructor(private http: HttpClient) {}

    getContainers(): Observable<Container[]> {

           return this.http.get<ApiResponse<Container[]>>(environment.apiUrl + '/containers').pipe(
                map((response) => {
                    if (response.code !== ApiResponseResult.success) {
                        throw response.messages;
                     }
                     return response.result;
                    }),
                    catchError((error: any) => Observable.throw(error.json))
                );


    }
}
