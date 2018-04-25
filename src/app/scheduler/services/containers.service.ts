import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ContainerServer } from '../models/server/container.servermodel';
import { HttpClient } from '@angular/common/http';
import { Container } from '../models/container.dto';
import { environment } from '../../../environments/environment';
import { ApiResponseResult, ApiResponse } from '../../shared/shared.model';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class ContainersService {
    constructor(private http: HttpClient) {}

    getContainers(): Observable<Container[]> {
           return this.http.get<ApiResponse<ContainerServer[]>>(environment.apiUrl + '/containers').pipe(
                map((response) => {
                    if (response.code !== ApiResponseResult.success) {
                        throw response.messages;
                     }
                     console.log(response);
                     return response.result.map(Container.fromServer);
                    }),
                    catchError((error: any) => Observable.throw(error.json))
                );
    }
}
