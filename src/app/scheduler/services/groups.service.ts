
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { GroupFilter, GroupFilterViewModel } from '../models/groupfilter.dto';
import { GroupFilterServer } from '../models/server/group.servermodel';

@Injectable()
export class GroupsService {

    constructor(private http: HttpClient) {}

    getGroups(): Observable<GroupFilter[]> {
        return this.http
            .get<GroupFilterServer[]>(environment.apiUrl + '/groupfilters')
            .pipe(
                map((response) => {
                    return response.map(f => GroupFilter.fromServer(f));
                })
            );
    }

    updateGroup(model: GroupFilterViewModel) {
        const serverModel: GroupFilterServer = {
            id: model.id,
            name: model.name,
            type: model.type,
            containers: model.selectedContainers.map(i => i.id),
            filters: model.filtersWithSelectedValue.map(f => {
                return {
                    id: f.id,
                    values: f.selectedValues.map(sv => sv.id)
                };
            })
        };

        return this.http
            .post(environment.apiUrl + '/groupfilters', serverModel);
    }

    setGroup(idGroup: number | null): Observable<boolean> {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
        if (currentUser === '') {
            // tslint:disable-next-line: deprecation
            return of(false);
        }
        return this.http
            .post<boolean>(environment.apiUrl + '/groupfilters/setGroup', {
                idGroup: idGroup,
                idUser: currentUser.id
            } );
    }
}
