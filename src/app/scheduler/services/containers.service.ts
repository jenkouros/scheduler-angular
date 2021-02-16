
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ContainerServer } from '../models/server/container.servermodel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Container, ContainerStatus } from '../models/container.dto';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { ContainerEvents, ContainerPutRequest } from '../models/event.model';
import { DictionaryHelper } from '../helpers/dictionary.helper';

@Injectable()
export class ContainersService {
    constructor(private http: HttpClient) {}

    getContainers(filterDictionary: {[id: string]: number[]} = {}, containerFilter: Container[] = []): Observable<Container[]> {
        const dict = DictionaryHelper.stringify(filterDictionary);
        let params = new HttpParams()
            .set('ids', dict.ids)
            .set('values', dict.values);

        containerFilter.forEach(c => {
            params = params.append('containers', c.id.toString());
        });

        return this.http.get<ContainerServer[]>(environment.apiUrl + '/containers', { params: params }).pipe(
            map((containers) => {
                return containers.map(Container.fromServer);
            }),
            catchError((error: any) => observableThrowError(error.json))
            );
    }

    getStatuses(): Observable<ContainerStatus[]> {
        return this.http
            .get<ContainerStatus[]>(environment.apiUrl + '/containers/status')
            .pipe(
                map((response) => {
                    return response.map(s => ContainerStatus.fromServer(s));
                })
            );
    }

    removeContainersBlankSpace(containerIds: number[]) {
        return this.http.post(environment.apiUrl + '/containers/removeBlankSpace', containerIds);
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

    updateContainer(request: ContainerPutRequest) {
        return this.http.put<ContainerServer>(environment.apiUrl + '/containers', request).pipe(
            map(container => Container.fromServer(container))
        );
      }
}
