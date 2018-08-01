import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Schedule, ScheduleServer } from '../models/timetable.model';
import { HttpParams } from '@angular/common/http';
import { SubCalendar, SelectedContainers } from '../models/calendar.model';

@Injectable()
export class TimeTablesService {
  constructor(private http: HttpClient) {}

  getTimeTables(subCalendarId: number): Observable<Schedule> {
    const httpParams = new HttpParams().set(
      'idSubCalendar',
      subCalendarId.toString()
    );

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
}

// subcalendars

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
