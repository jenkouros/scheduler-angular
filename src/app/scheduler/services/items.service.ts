import { Injectable } from '@angular/core';

// import { createStore } from 'devextreme-aspnet-data-nojquery';
// import CustomStore from 'devextreme/data/custom_store';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import { ItemHierarchyServer } from '../models/server/item.servermodel';
import { ItemHierarchy } from '../models/item.dto';
import { map, catchError } from 'rxjs/operators';
import { GridStoreConfiguration } from '../models/shared.dto';
import { DictionaryHelper } from '../helpers/dictionary.helper';


export class Test {
    constructor(private id: string, private value: number) {}
}

@Injectable()
export class ItemsService {
    constructor(private http: HttpClient) {}

    // getItemsStore(): CustomStore {
    //     const store = createStore({
    //         loadUrl: environment.apiUrl + '/items/grid',
    //         loadParams: {
    //             customFilter1: 1,
    //             customFilter2: 2
    //         },
    //         key: 'idItem'
    //     });
    //     return store;
    // }

    getItemsStoreConfiguration(filterDictionary: {[id: string]: number[]}): GridStoreConfiguration {
        const dict = DictionaryHelper.stringify(filterDictionary);
        return {
            loadUrl: environment.apiUrl + `/items/grid`,
            key: 'idItem',
            loadParams: {
                ids : dict.ids,
                values: dict.values
            }
        };
    }

    getItemHierarchy(itemId): Observable<ItemHierarchy> {
        return this.http
            .get<ItemHierarchyServer>(environment.apiUrl + '/items?idItem=' + itemId)
            .pipe(
                map((response) => {
                    return ItemHierarchy.fromServer(response);
                }),
            );
    }

    hideItem(itemId: number) {
        return this.http.post(environment.apiUrl + '/items/hideItem', itemId);
    }

}
