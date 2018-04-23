import { Injectable } from '@angular/core';

import { createStore } from 'devextreme-aspnet-data-nojquery';
import CustomStore from 'devextreme/data/custom_store';

import { PlanItem } from '../models/planitem.model';
import { environment } from '../../../environments/environment';
// import { Store } from '@ngrx/store';
// import * as fromStore from '../store';


@Injectable()
export class PlanItemsService {
    constructor(/* private store: Store<fromStore.SchedulerState> */) {}

    getPlanItemsStore(): CustomStore {
        const store = createStore({
            loadUrl: environment.apiUrl + '/items',
            loadParams: {
                customFilter1: 1,
                customFilter2: 2
            },
            key: 'idPlanItem'
        });
        // store.on('loaded', (data: PlanItem[]) => this.store.dispatch(new fromStore.LoadPlanItemsSuccess(data)));
        // store.on('loading', () => this.store.dispatch(new fromStore.LoadPlanItems()));

        return store;
    }

}

// const dummyPlanItem: PaginationResponse<PlanItem> = {
//     metadata: {
//         page: 0,
//         pageCount: 1,
//         pageSize: 10,
//         totalCount: 2
//     },
//     records: [
//         {
//             id: 1,
//             code: '10000',
//             limitDateFrom: new Date(),
//             limitDateTo: new Date(),
//             measurementUnit: {
//                 code: 'KOS',
//                 name: 'Kos'
//             },
//             quantity: 1000,
//             quantityBatch: 500,
//             quantityPlanned: 0,
//             product: {
//                 code: '50D',
//                 id: 1,
//                 name: 'Bencin 50D'
//             }
//         },
//         {
//             id: 2,
//             code: '20000',
//             limitDateFrom: new Date(),
//             limitDateTo: new Date(),
//             measurementUnit: {
//                 code: 'KG',
//                 name: 'Kilogram'
//             },
//             quantity: 1000,
//             quantityBatch: 500,
//             quantityPlanned: 0,
//             product: {
//                 code: 'Jupol Gold',
//                 id: 2,
//                 name: 'Jupol Gold'
//             }
//         }
//     ]
// };
