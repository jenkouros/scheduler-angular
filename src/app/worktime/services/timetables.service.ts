import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Calendar } from '../models/calendar.model';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import date_box from 'devextreme/ui/date_box';
import { TimeTable } from '../models/timetable.model';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class TimeTablesService {
  constructor(private http: HttpClient) {}

  getTimeTables(calendarId: number): Observable<TimeTable[]> {
    const httpParams = new HttpParams().set(
      'idCalendar',
      calendarId.toString()
    );

    return this.http
      .get<ApiResponse<TimeTable[]>>(`${environment.apiUrl}/timetables`, {
        params: httpParams
      })
      .pipe(
        map(response => {
          if (response.code !== ApiResponseResult.success) {
            throw response.messages;
          }
          return response.result;
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }
}

/*
getEvents(containerIds: number[], fromDate: Date, toDate: Date): Observable<PlannedEvent[]> {
        let httpParams = new HttpParams()
            .set('IdPlan', '1')
            .set('timeStart', moment(fromDate).toISOString())
            .set('timeEnd', moment(toDate).toISOString()); // .format());

        containerIds.forEach(id => {
            httpParams = httpParams.append('containers', id.toString());
        });

        const serachParams = {
            params: httpParams

        };

        return this.http.get<ApiResponse<PlannedEventServer[]>>(environment.apiUrl + '/planitems', { params: httpParams }).pipe(
            map((response) => {
                if (response.code !== ApiResponseResult.success) {
                    throw response.messages;
                }
                return response.result.map(PlannedEvent.fromServer);
            }),
            catchError((error: any) => observableThrowError(error.json))
        );
    }

*/
