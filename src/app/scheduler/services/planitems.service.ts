import { Injectable } from '@angular/core';

import { createStore } from 'devextreme-aspnet-data-nojquery';
import CustomStore from 'devextreme/data/custom_store';
import { environment } from '../../../environments/environment';



@Injectable()
export class PlanItemsService {
    constructor() {}

    getPlanItemsStore(): CustomStore {
        const store = createStore({
            loadUrl: environment.apiUrl + '/items/grid',
            loadParams: {
                customFilter1: 1,
                customFilter2: 2
            },
            key: 'idItem'
        });
        return store;
    }

}
