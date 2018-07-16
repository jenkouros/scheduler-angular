
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import { PreplanitemServer } from '../models/server/preplanitem.servermodel';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { PreplanItem, PreplanItemRequest } from '../models/preplanitem.dto';

@Injectable()
export class PreplanitemsService {
    constructor(private http: HttpClient) {}

    getPreplanitems() {
        return this.http.get<PreplanitemServer[]>
            (environment.apiUrl + '/preplanitems')
            .pipe(
                map(response => {
                    return response.map(f => PreplanItem.fromServer(f));
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
