import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Calendar, SubCalendar } from '../models/calendar.model';
import { ApiResponse, ApiResponseResult } from '../../shared/shared.model';
import * as moment from 'moment';

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
    return this.http.post<Calendar>(`${environment.apiUrl}/calendars`, payload).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error.json()))
    );
  }

  updateCalendar(payload: Calendar): Observable<Calendar> {
    return this.http.put<Calendar>(`${environment.apiUrl}/calendars`, payload).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error.json()))
    );
  }

  removeCalendar(payload: Calendar): Observable<Boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/calendars?id=${payload.id}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error.json()))
    );
  }

  // subcalendars
  createSubCalendar(payload: SubCalendar): Observable<SubCalendar> {
    return this.http.post<SubCalendar>(`${environment.apiUrl}/calendars/subcalendar`, payload).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error.json()))
    );
  }

  updateSubCalendar(payload: SubCalendar): Observable<SubCalendar> {
    return this.http.put<SubCalendar>(`${environment.apiUrl}/calendars/subcalendar`, payload).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error.json()))
    );
  }
  // .delete<Calendar>(`${environment.apiUrl}/calendars/${payload.id}`)
  removeSubCalendar(payload: SubCalendar): Observable<SubCalendar> {
    return this.http
      .delete<SubCalendar>(`${environment.apiUrl}/calendars/subcalendar?id=${payload.id}`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }

  generateCalendar(payload: Date): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/calendars/generate`, payload).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error.json()))
    );
  }
}
