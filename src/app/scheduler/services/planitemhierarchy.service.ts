import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PlanItemHierarchyServer } from '../models/server/planitem.servermodel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import { map, catchError } from 'rxjs/operators';
import { PlanItemHierarchy } from '../models/planitem.dto';

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
                catchError((error: any) => Observable.throw(error.json()))
            );

    }
}
/*
const dummyPlanItemHierarchy: PlanItemHierarchyServer = {
    id: 2,
    alternatives: [
        {
            code: '#01',
            id: 1,
            name: 'Alternativa #01',
            subItems: [
                {
                    id: 1,
                    code: '1000',
                    name: 'Priprava',
                    isPlanable: false,
                    sequenceNumber: 1,
                    defaultQuantity: 0,
                    defaultExecutionNormative: 0,
                    defaultPreparationtNormative: 10,
                    // normativeTimeWorker: 10
                },
                {
                    id: 2,
                    code: '2000',
                    name: 'Izdelava',
                    isPlanable: true,
                    sequenceNumber: 2,
                    defaultQuantity: 500,
                    defaultExecutionNormative: 30,
                    defaultPreparationtNormative: 10,
                    // normativeTimeWorker: 40
                },
                {
                    id: 3,
                    code: '3000',
                    name: 'Medfazna kontrola',
                    isPlanable: false,
                    sequenceNumber: 3,
                    defaultQuantity: 500,
                    defaultExecutionNormative: 0,
                    defaultPreparationtNormative: 0,
                    // normativeTimeWorker: 20
                },
                {
                    id: 4,
                    code: '4000',
                    name: 'Izdelava',
                    isPlanable: true,
                    sequenceNumber: 4,
                    defaultQuantity: 1500,
                    defaultExecutionNormative: 60,
                    defaultPreparationtNormative: 15,
                    // normativeTimeWorker: 75
                },
                {
                    id: 5,
                    code: '5000',
                    name: 'Končna kontrola',
                    isPlanable: false,
                    sequenceNumber: 5,
                    defaultQuantity: 1500,
                    defaultExecutionNormative: 0,
                    defaultPreparationtNormative: 0,
                    // normativeTimeWorker: 30
                },
            ]
        },
        {
            code: '#02',
            id: 2,
            name: 'Alternativa #02',
            subItems: [
                {
                    id: 10,
                    code: '1000',
                    name: 'Priprava',
                    isPlanable: false,
                    sequenceNumber: 1,
                    defaultQuantity: 0,
                    defaultExecutionNormative: 0,
                    defaultPreparationtNormative: 20,
                    // normativeTimeWorker: 20
                },
                {
                    id: 11,
                    code: '2000',
                    name: 'Izdelava',
                    isPlanable: true,
                    sequenceNumber: 2,
                    defaultQuantity: 1500,
                    defaultExecutionNormative: 90,
                    defaultPreparationtNormative: 20,
                    // normativeTimeWorker: 110
                },
                {
                    id: 12,
                    code: '3000',
                    name: 'Medfazna kontrola',
                    isPlanable: false,
                    sequenceNumber: 3,
                    defaultQuantity: 1500,
                    defaultExecutionNormative: 0,
                    defaultPreparationtNormative: 0,
                    // normativeTimeWorker: 30
                }
            ]
        }
    ]
};
*/
