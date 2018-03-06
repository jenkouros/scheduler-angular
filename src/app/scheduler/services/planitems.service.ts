import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError, map, tap } from "rxjs/operators";

import { PlanItem } from "../models/planitem.model";
import { ApiResponse, PaginationResponse } from "../../shared/shared.model";

const url = "http://localhost:3000";

@Injectable()
export class PlanItemsService {
    constructor(private http: HttpClient) {}

    getPlanItems(): Observable<PaginationResponse<PlanItem>> {
        return this.http
            .get<ApiResponse<PaginationResponse<PlanItem>>>(url + "/planitems")
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