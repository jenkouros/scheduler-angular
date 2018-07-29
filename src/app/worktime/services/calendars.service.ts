import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Calendar, SubCalendar } from '../models/calendar.model';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';

@Injectable()
export class CalendarsService {
  constructor(private http: HttpClient) {}

  getCalendars(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(`${environment.apiUrl}/calendars`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error.json()))
    );
  }

  createCalendar(payload: Calendar): Observable<Calendar> {
    return this.http
      .post<Calendar>(`${environment.apiUrl}/calendars`, payload)
      .pipe(
        map(response => {
          return response;
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }

  updateCalendar(payload: Calendar): Observable<Calendar> {
    return this.http
      .put<Calendar>(`${environment.apiUrl}/calendars`, payload)
      .pipe(
        map(response => {
          return response;
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }

  removeCalendar(payload: Calendar): Observable<Calendar> {
    return this.http
      .delete<Calendar>(`${environment.apiUrl}/calendars/${payload.id}`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }

  // subcalendars
  createSubCalendar(payload: SubCalendar): Observable<SubCalendar> {
    console.log(payload);
    return this.http
      .post<SubCalendar>(`${environment.apiUrl}/calendars/subcalendar`, payload)
      .pipe(
        map(response => {
          return response;
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }

  updateSubCalendar(payload: SubCalendar): Observable<SubCalendar> {
    return this.http
      .put<SubCalendar>(`${environment.apiUrl}/calendars/subcalendar`, payload)
      .pipe(
        map(response => {
          return response;
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }

  removeSubCalendar(payload: SubCalendar): Observable<SubCalendar> {
    return this.http
      .delete<SubCalendar>(
        `${environment.apiUrl}/calendars/subcalendar/${payload.id}`
      )
      .pipe(
        map(response => {
          return response;
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
