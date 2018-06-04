
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ContainerServer } from '../models/server/container.servermodel';
import { HttpClient } from '@angular/common/http';
import { Container } from '../models/container.dto';
import { environment } from '../../../environments/environment';
import { ApiResponseResult, ApiResponse } from '../../shared/shared.model';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ContainerEvents } from '../models/event.model';

@Injectable()
export class ContainersService {
    constructor(private http: HttpClient) {}

    getContainers(): Observable<Container[]> {
        return this.http.get<ApiResponse<ContainerServer[]>>(environment.apiUrl + '/containers').pipe(
            map((response) => {
                if (response.code !== ApiResponseResult.success) {
                    throw response.messages;
                }
                return response.result.map(Container.fromServer);
            }),
            catchError((error: any) => observableThrowError(error.json))
            );
    }

    removeContainersBlankSpace(containerIds: number[]) {
        return this.http.post<ApiResponse<any>>(environment.apiUrl + '/containers/removeBlankSpace', containerIds)
            .pipe(
                map(response => {
                    if (response.code === ApiResponseResult.success) {
                        return;
                    }
                    throw response.messages;
                }),
                catchError(error => observableThrowError(error.json))
            );
    }

    getDateBoundsForLoadedContainerEvents(containerEventsList: ContainerEvents[]) {
        let minFromDate: Date = new Date();
        let maxToDate: Date = new Date();
        for (const containerEvents of containerEventsList) {
            if (containerEvents.dateFrom < minFromDate) {
                minFromDate = containerEvents.dateFrom;
            }
            if (containerEvents.dateTo > maxToDate) {
                maxToDate = containerEvents.dateTo;
            }
        }
        return {
            minFromDate,
            maxToDate
        };

    }
}
