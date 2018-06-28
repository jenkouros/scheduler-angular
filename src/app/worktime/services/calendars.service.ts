import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Calendar } from '../models/calendar.model';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import date_box from 'devextreme/ui/date_box';

@Injectable()
export class CalendarsService {
  constructor(private http: HttpClient) {}

  getCalendars(): Observable<Calendar[]> {
    return this.http
      .get<ApiResponse<Calendar[]>>(`${environment.apiUrl}/calendars`)
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

  createCalendar(payload: Calendar): Observable<Calendar> {
    return this.http
      .post<ApiResponse<Calendar>>(`${environment.apiUrl}/calendars`, payload)
      .pipe(
        map(response => {
          return this.HandleCalendarsServiceResponse(response);
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }

  updateCalendar(payload: Calendar): Observable<Calendar> {
    return this.http
      .put<ApiResponse<Calendar>>(`${environment.apiUrl}/calendars`, payload)
      .pipe(
        map(response => {
          return this.HandleCalendarsServiceResponse(response);
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }

  private HandleCalendarsServiceResponse(response: ApiResponse<Calendar>) {
    if (response.code !== ApiResponseResult.success) {
      throw response.messages;
    }
    return {
      id: 1,
      timeStart: new Date(),
      timeEnd: new Date(),
      description: ''
    };
  }
}
/*

 return this.http.post<ApiResponse<PlannedEventServer>>(environment.apiUrl + '/planitems', planningItem,
            {
                headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
            }).pipe(
            map((response) => {
                if (response.code !== ApiResponseResult.success) {
                    throw response.messages;
                }
                return PlannedEvent.fromServer(response.result);
            } )
        );
*/
