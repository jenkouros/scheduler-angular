import { Injectable } from '@angular/core';

import { createStore } from 'devextreme-aspnet-data-nojquery';
import CustomStore from 'devextreme/data/custom_store';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import { ItemHierarchyServer } from '../models/server/item.servermodel';
import { ItemHierarchy } from '../models/item.dto';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ItemsService {
    constructor(private http: HttpClient) {}

    getItemsStore(): CustomStore {
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

    getItemHierarchy(itemId): Observable<ItemHierarchy> {
        return this.http
            .get<ApiResponse<ItemHierarchyServer>>(environment.apiUrl + '/items?idItem=' + itemId)
            .pipe(
                map((response) => {
                    if (response.code !== ApiResponseResult.success) {
                        throw response.messages;
                    }
                    return ItemHierarchy.fromServer(response.result);
                }),
                catchError((error: any) => throwError(error.json()))
            );
    }

}
