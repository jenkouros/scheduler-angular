
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import { PreplanitemServer, PreplanitemSuggestionServer } from '../models/server/preplanitem.servermodel';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { PreplanItem, PreplanItemRequest, PrePlanItemSuggestion } from '../models/preplanitem.dto';
import { DictionaryHelper } from '../helpers/dictionary.helper';

@Injectable()
export class PreplanitemsService {
    constructor(private http: HttpClient) {}

    getPreplanitems(filterDictionary: {[id: string]: number[]} = {}) {
      const dict = DictionaryHelper.stringify(filterDictionary);
      const params = new HttpParams()
      .set('ids', dict.ids)
      .set('values', dict.values);

      return this.http.get<PreplanitemServer[]>
          (environment.apiUrl + '/preplanitems', { params: params })
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
        return this.http.delete<PreplanitemServer[]>
            (environment.apiUrl + '/preplanitems?idItemBatch=' + itemBatchId);
    }

    createPreplanitems(requestModel: PreplanItemRequest) {
        return this.http.post(environment.apiUrl + '/preplanitems', requestModel, {
            headers: new HttpHeaders( { 'Access-Control-Allow-Origin': '*' })
        });
    }
}
