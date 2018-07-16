
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import { FilterServer } from '../models/server/filter.servermodel';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Filter } from '../models/filter.dto';

@Injectable()
export class FiltersService {

    constructor(private http: HttpClient) {}

    getFilters(): Observable<Filter[]> {
        return this.http
            .get<FilterServer[]>(environment.apiUrl + '/filters')
            .pipe(
                map((response) => {
                    return response.map(f => Filter.fromServer(f));
                })
            );
    }
}
