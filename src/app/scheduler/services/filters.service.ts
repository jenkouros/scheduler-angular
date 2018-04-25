import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import { FilterServer } from '../models/server/filter.servermodel';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Filter } from '../models/filter.dto';

@Injectable()
export class FiltersService {

    constructor(private http: HttpClient) {}

    getFilters(): Observable<Filter[]> {
        return this.http
            .get<ApiResponse<FilterServer[]>>(environment.apiUrl + '/filters')
            .pipe(
                map((response) => {
                    if (response.code !== ApiResponseResult.success) {
                        throw response.messages;
                    }
                    return response.result.map(f => Filter.FromServer(f));
                }),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }
}
