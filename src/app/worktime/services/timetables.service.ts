import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Schedule, ScheduleServer, TimeTable } from '../models/timetable.model';
import { HttpParams } from '@angular/common/http';
import { SubCalendar, SelectedContainers } from '../models/calendar.model';

@Injectable()
export class TimeTablesService {
  constructor(private http: HttpClient) {}

  getTimeTables(subCalendarId: number): Observable<Schedule> {
    const httpParams = new HttpParams().set('idSubCalendar', subCalendarId.toString());

    return this.http
      .get<ScheduleServer>(`${environment.apiUrl}/calendars/subcalendar`, {
        params: httpParams
      })
      .pipe(
        map(response => {
          return Schedule.fromServer(response);
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }

  createTimeTable(payload: TimeTable): Observable<TimeTable> {
    //console.log(payload);
    return this.http.post<TimeTable>(`${environment.apiUrl}/calendars/timetable`, payload).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error.json()))
    );
  }

  updateTimeTable(payload: TimeTable): Observable<TimeTable> {
    return this.http.put<TimeTable>(`${environment.apiUrl}/calendars/timetable`, payload).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error.json()))
    );
  }

  removeTimeTable(payload: TimeTable): Observable<TimeTable> {
    return this.http
      .delete<TimeTable>(`${environment.apiUrl}/calendars/timetable?id=${payload.id}`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }
}
