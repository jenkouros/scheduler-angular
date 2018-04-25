import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import { PreplanitemServer } from '../models/server/preplanitem.servermodel';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { PreplanItem } from '../models/preplanitem.dto';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PreplanitemsService {
    constructor(private http: HttpClient) {}

    getPreplanitems() {
        return this.http.get<ApiResponse<PreplanitemServer[]>>
            (environment.apiUrl + '/preplanitems')
            .pipe(
                map(response => {
                    if (response.code !== ApiResponseResult.success) {
                        throw response.messages;
                    }
                    return response.result.map(f => PreplanItem.fromServer(f));
                }),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }
}
