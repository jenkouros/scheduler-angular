import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PlanItemHierarchy } from '../models/planitem.model';

@Injectable()
export class PlanItemHierarchyService {
    constructor() {

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

