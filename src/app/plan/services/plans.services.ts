import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Plan } from '../models/plan.model';
import { Simulation } from '../models/change.model';

@Injectable()
export class PlansService {
  constructor(private http: HttpClient) {}

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${environment.apiUrl}/plans`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error.json()))
    );
  }

  getPlanSiumulation(planId: number): Observable<Simulation[]> {
    return this.http
      .get<Simulation[]>(`${environment.apiUrl}/plans/getPlanDifferencess?idPlan=${planId}`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }

  createPlan(payload: Plan): Observable<Plan> {
    return this.http
      .post<Plan>(
        `${environment.apiUrl}/plans?name=${payload.name}&description=${payload.description}`,
        null
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }

  removePlan(payload: Plan): Observable<Plan> {
    return this.http.delete<Plan>(`${environment.apiUrl}/plans?idPlan=${payload.idPlan}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error.json()))
    );
  }
}
