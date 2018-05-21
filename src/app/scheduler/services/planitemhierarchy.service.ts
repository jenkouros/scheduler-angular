import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { PlanItemHierarchyServer } from '../models/server/planitem.servermodel';
import { PlanItemHierarchy } from '../models/planitem.dto';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';



@Injectable()
export class PlanItemHierarchyService {
    constructor(private http: HttpClient) {
    }

    getPlanItemHierarchy(planItemId): Observable<PlanItemHierarchy> {
        return this.http
            .get<ApiResponse<PlanItemHierarchyServer>>(environment.apiUrl + '/items?idItem=' + planItemId)
            .pipe(
                map((response) => {
                    if (response.code !== ApiResponseResult.success) {
                        throw response.messages;
                    }
                    return PlanItemHierarchy.fromServer(response.result);
                }),
                catchError((error: any) => observableThrowError(error.json()))
            );
    }
}
