import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError, map, tap } from "rxjs/operators";

import { PlanItem } from "../models/planitem.model";
import { ApiResponse, PaginationResponse, ApiResponseResult, PaginationQuery } from "../../shared/shared.model";
import { environment } from "../../../environments/environment";


@Injectable()
export class PlanItemsService {
    constructor(private http: HttpClient) {}

    getPlanItems(page: number, pageSize: number): Observable<PaginationResponse<PlanItem>> {
        let params = new HttpParams({
            fromObject: {
                PageIndex: (page - 1).toString(), 
                PageSize: pageSize.toString()
            }
        });

        return this.http
            .get<ApiResponse<PaginationResponse<PlanItem>>>(environment.apiUrl + "/planitems", { params: params })
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