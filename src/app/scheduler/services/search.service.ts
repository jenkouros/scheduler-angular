import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { environment } from '../../../environments/environment';

@Injectable()
export class SearchService {
    constructor(private http: HttpClient) {}

    getSearchItemsStore(search: string): CustomStore {
        const store = createStore({
            loadUrl: environment.apiUrl + '/items/searchgrid',
            loadParams: search === ''
                ? undefined
                : {
                    search: search
                },
            key: 'idItem'
        });

        return store;
    }

    getSearchPlanItemsStore(search: string): CustomStore {
        const store = createStore({
            loadUrl: environment.apiUrl + '/planitems/searchgrid',
            loadParams: search === ''
                ? undefined
                : {
                    search: search
                }
        });

        return store;
    }
}
