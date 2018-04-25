import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ContainerServer } from '../models/server/container.servermodel';
import { HttpClient } from '@angular/common/http';
import { Container } from '../models/container.dto';
import { environment } from '../../../environments/environment';
import { ApiResponseResult, ApiResponse } from '../../shared/shared.model';
import { switchMap, map, catchError } from 'rxjs/operators';

const dummyContainers: ContainerServer[] = [
    {
        code: 'D1',
        idContainer: 1,
        name: 'Delovno mesto D1'
    },
    {
        code: 'D2',
        idContainer: 2,
        name: 'Delovno mesto D2'
    },
    {
        code: 'D3',
        idContainer: 3,
        name: 'Delovno mesto D3'
    },
    {
        code: 'D4',
        idContainer: 4,
        name: 'Delovno mesto D4'
    },
    {
        code: 'D5',
        idContainer: 5,
        name: 'Delovno mesto D5'
    },
];



@Injectable()
export class ContainersService {
    constructor(private http: HttpClient) {}

    getContainers(): Observable<Container[]> {
        // TODO - go to server
        return new Observable<Container[]>(observer => {
            observer.next(dummyContainers.map(serverContainer => Container.fromServer(serverContainer)));
        });

           /*return this.http.get<ApiResponse<Container[]>>(environment.apiUrl + '/containers').pipe(
                map((response) => {
                    if (response.code !== ApiResponseResult.success) {
                        throw response.messages;
                     }
                     return response.result;
                    }),
                    catchError((error: any) => Observable.throw(error.json))
                );*/


    }
}
