import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { PlanItem, PlanItemHierarchy } from '../models/planitem.model';
import { ApiResponse, PaginationResponse, ApiResponseResult, PaginationQuery } from '../../shared/shared.model';
import { environment } from '../../../environments/environment';


@Injectable()
export class PlanItemsService {
    constructor(private http: HttpClient) {}

    getPlanItems(page: number, pageSize: number): Observable<PaginationResponse<PlanItem>> {
        const params = new HttpParams({
            fromObject: {
                PageIndex: (page - 1).toString(),
                PageSize: pageSize.toString()
            }
        });

        return new Observable<PaginationResponse<PlanItem>>(observer => {
            observer.next(dummyPlanItem);
        });


        // REAL DATABASE ACCESS:
        // return this.http
        //     .get<ApiResponse<PaginationResponse<PlanItem>>>(environment.apiUrl + '/planitems', { params: params })
        //     .pipe(
        //         map((response) => {
        //             if (response.code !== ApiResponseResult.success) {
        //                 throw response.messages;
        //             }
        //             return response.result;
        //         }),
        //         catchError((error: any) => Observable.throw(error.json()))
        //     );
    }

    getPlanItemHierarchy(planItemId) {
        // TODO return from database
        // PlanItemHierarchy

        return new Observable<PlanItemHierarchy>(observer => {
            observer.next(dummyPlanItemHierarchy);
        });
    }

}

const dummyPlanItemHierarchy: PlanItemHierarchy = {
    idPlanItem: 1,
    alternatives: [
        {
            code: '#01',
            id: 1,
            name: 'Alternativa #01',
            planSubItems: [
                {
                    code: '1000',
                    name: 'Priprava',
                    planable: false,
                    sequence: 1,
                    quantity: 0,
                    normativeTimeMachine: 0,
                    normativeTimePreparation: 10,
                    normativeTimeWorker: 10
                },
                {
                    code: '2000',
                    name: 'Izdelava',
                    planable: true,
                    sequence: 2,
                    quantity: 500,
                    normativeTimeMachine: 30,
                    normativeTimePreparation: 10,
                    normativeTimeWorker: 40
                },
                {
                    code: '3000',
                    name: 'Medfazna kontrola',
                    planable: false,
                    sequence: 3,
                    quantity: 500,
                    normativeTimeMachine: 0,
                    normativeTimePreparation: 0,
                    normativeTimeWorker: 20
                },
                {
                    code: '4000',
                    name: 'Izdelava',
                    planable: true,
                    sequence: 4,
                    quantity: 1500,
                    normativeTimeMachine: 60,
                    normativeTimePreparation: 15,
                    normativeTimeWorker: 75
                },
                {
                    code: '5000',
                    name: 'Končna kontrola',
                    planable: false,
                    sequence: 5,
                    quantity: 1500,
                    normativeTimeMachine: 0,
                    normativeTimePreparation: 0,
                    normativeTimeWorker: 30
                },
            ]
        },
        {
            code: '#02',
            id: 2,
            name: 'Alternativa #02',
            planSubItems: [
                {
                    code: '1000',
                    name: 'Priprava',
                    planable: false,
                    sequence: 1,
                    quantity: 0,
                    normativeTimeMachine: 0,
                    normativeTimePreparation: 20,
                    normativeTimeWorker: 20
                },
                {
                    code: '2000',
                    name: 'Izdelava',
                    planable: true,
                    sequence: 2,
                    quantity: 1500,
                    normativeTimeMachine: 90,
                    normativeTimePreparation: 20,
                    normativeTimeWorker: 110
                },
                {
                    code: '3000',
                    name: 'Medfazna kontrola',
                    planable: false,
                    sequence: 3,
                    quantity: 1500,
                    normativeTimeMachine: 0,
                    normativeTimePreparation: 0,
                    normativeTimeWorker: 30
                }
            ]
        }
    ]
};

const dummyPlanItem: PaginationResponse<PlanItem> = {
    metadata: {
        page: 0,
        pageCount: 1,
        pageSize: 10,
        totalCount: 2
    },
    records: [
        {
            id: 1,
            code: '10000',
            limitDateFrom: new Date(),
            limitDateTo: new Date(),
            measurementUnit: {
                code: 'KOS',
                name: 'Kos'
            },
            quantity: 1000,
            quantityBatch: 500,
            quantityPlanned: 0,
            product: {
                code: '50D',
                id: 1,
                name: 'Bencin 50D'
            }
        },
        {
            id: 2,
            code: '20000',
            limitDateFrom: new Date(),
            limitDateTo: new Date(),
            measurementUnit: {
                code: 'KG',
                name: 'Kilogram'
            },
            quantity: 1000,
            quantityBatch: 500,
            quantityPlanned: 0,
            product: {
                code: 'Jupol Gold',
                id: 2,
                name: 'Jupol Gold'
            }
        }
    ]
};
