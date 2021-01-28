import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { createStore } from 'devextreme-aspnet-data-nojquery';
// import CustomStore from 'devextreme/data/custom_store';
import { environment } from '../../../environments/environment';
import { CreateItemInput } from '../components/item/item-create/item-create.model';
import { DictionaryHelper } from '../helpers/dictionary.helper';
import { ItemHierarchy } from '../models/item.dto';
import { ItemHierarchyServer } from '../models/server/item.servermodel';
import { GridStoreConfiguration } from '../models/shared.dto';
import { ItemBasicServer } from './../models/server/item.servermodel';


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
    filterDictionary: { [id: string]: number[] } | undefined,
    showPlanned: boolean
  ): GridStoreConfiguration {
    const dict = DictionaryHelper.stringify(filterDictionary);
    return {
      loadUrl: environment.apiUrl + `/items/grid`,
      key: 'idItem',
      loadParams: {
        idPlan: idPlan,
        ids: dict.ids,
        values: dict.values,
        showPlanned: showPlanned
      }
    };
  }

  getItemHierarchy(itemId): Observable<ItemHierarchy> {
    return this.http.get<ItemHierarchyServer>(environment.apiUrl + '/items/getItemStructure?idItem=' + itemId).pipe(
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

  createItem(createInput: CreateItemInput, filterDictionary: {[id: string]: number[]} | undefined) {
    const dict = DictionaryHelper.stringify(filterDictionary);
    createInput.filterIds = dict.ids;
    createInput.filterValues = dict.values;
    return this.http.post<ItemBasicServer>(
      environment.apiUrl + `/items/createItem`, createInput);
  }


}
