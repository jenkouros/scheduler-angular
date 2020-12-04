import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DictionaryHelper } from '../helpers/dictionary.helper';
import { PreplanItem, PreplanItemRequest, PrePlanItemSuggestion } from '../models/preplanitem.dto';
import { PreplanitemServer, PreplanitemSuggestionServer } from '../models/server/preplanitem.servermodel';

@Injectable()
export class PreplanitemsService {
  constructor(private http: HttpClient) {}

  getPreplanitems(idPlan: number, filterDictionary: { [id: string]: number[] } = {}) {
    const dict = DictionaryHelper.stringify(filterDictionary);
    const params = new HttpParams()
      .set('idPlan', idPlan.toString())
      .set('ids', dict.ids)
      .set('values', dict.values);

    return this.http
      .get<PreplanitemServer[]>(environment.apiUrl + '/preplanitems', { params: params })
      .pipe(
        map(response => {
          return response.map(f => PreplanItem.fromServer(f));
        })
      );
  }

  getPrePlanItemSuggestion(idPrePlanItem: number) {
    const params = new HttpParams()
      .set('idPrePlanItem', idPrePlanItem.toString());
    return this.http.get<PreplanitemSuggestionServer[]>
      (environment.apiUrl + '/preplanitems' + '/getPrePlanItemPlanSuggestion', { params: params })
      .pipe(
        map(response => {
          return response.map(f => PrePlanItemSuggestion.fromServer(f));
        })
      );
  }

  deleteItemBatch(itemBatchId: number) {
    // TODO create methods on serverside
    return this.http.delete<PreplanitemServer[]>(
      environment.apiUrl + '/preplanitems?idItemBatch=' + itemBatchId
    );
  }

  hidePreplanItem(preplanItemId: number) {
    // TODO create methods on serverside
    return this.http.post<boolean>(
      environment.apiUrl + '/preplanitems/hidePreplanItem',
        preplanItemId
    );
  }

  createPreplanitems(
    idPlan: number,
    requestModel: PreplanItemRequest,
    subItemPlannableState: {id: number, value: boolean}[]) {

      requestModel.subItemPlannableState = subItemPlannableState;
      return this.http.post(environment.apiUrl + `/preplanitems?idPlan=${idPlan}`,
        requestModel);
  }
}
