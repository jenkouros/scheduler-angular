import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse, ApiResponseResult } from "../../shared/shared.model";
import { Filter } from "../models/filter.model";
import { switchMap, map, catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { environment } from "../../../environments/environment";

@Injectable()
export class FiltersService {

    constructor(private http: HttpClient) {}

    getFilters(): Observable<Filter[]> {
        return this.http
            .get<ApiResponse<Filter[]>>(environment.apiUrl + "/filters")
            .pipe(
                map((response) => {
                    if(response.code !== ApiResponseResult.success) {
                        throw response.messages;
                    }
                    return response.result;
                }),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }
}