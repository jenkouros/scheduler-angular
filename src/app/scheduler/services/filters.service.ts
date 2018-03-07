import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "../../shared/shared.model";
import { Filter } from "../models/filter.model";
import { switchMap, map, catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

const url = "http://localhost:3000/filters"

@Injectable()
export class FiltersService {

    constructor(private http: HttpClient) {}

    getFilters(): Observable<Filter[]> {
        return this.http
            .get<ApiResponse<Filter[]>>(url)
            .pipe(
                map((response) => {
                    if(response.status !== "ok") {
                        throw response.messages;
                    }
                    return response.result;
                }),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }
}