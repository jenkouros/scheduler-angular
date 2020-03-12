import { ItemAutoplanRequest } from './../models/item-autoplan.model';
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
import { PlanItemGrid } from '../models/plan-item-grid-model';

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

  getItemsStoreConfiguration(
    idPlan: number,
    filterDictionary: { [id: string]: number[] } | undefined
  ): GridStoreConfiguration {
    const dict = DictionaryHelper.stringify(filterDictionary);
    return {
      loadUrl: environment.apiUrl + `/items/grid`,
      key: 'idItem',
      loadParams: {
        idPlan: idPlan,
        ids: dict.ids,
        values: dict.values
      }
    };
  }

  getItemHierarchy(itemId): Observable<ItemHierarchy> {
    return this.http.get<ItemHierarchyServer>(environment.apiUrl + '/items?idItem=' + itemId).pipe(
      map(response => {
        return ItemHierarchy.fromServer(response);
      })
    );
  }

  hideItem(idPlan: number, itemId: number) {
    return this.http.post(
      environment.apiUrl + `/items/hideItem?idPlan=${idPlan}&idItem=${itemId}`,
      null
    );
  }


}
