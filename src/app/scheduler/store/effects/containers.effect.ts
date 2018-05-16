import { ContainersService } from '../../services';
import { Actions, Effect } from '@ngrx/effects';
import * as fromActions from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/withLatestFrom';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { EventsState } from '../reducers/events.reducer';
import { Store } from '@ngrx/store';
import { ContainerEvents } from '../../models/event.model';
import { SchedulerState } from '../index';
import { ContainerState } from '../reducers/containers.reducer';
import { AppState } from '../../../store/app.reducers';

@Injectable()
export class ContainersEffects {
    constructor(
        private containersService: ContainersService,
        private actions$: Actions,
        private store: Store<AppState>
    ) {}

    @Effect()
    loadContainers$ = this.actions$
        .ofType(fromActions.LOAD_CONTAINERS)
        .pipe(
            switchMap(action => {
                return this.containersService.getContainers()
                    .pipe(
                        map(containers => new fromActions.LoadContainersSuccess(containers)),
                        catchError(error => of(new fromActions.LoadContainersFail()))
                    );
            })
        );

    @Effect()
    removeContainersBlankSpace = this.actions$
        .ofType(fromActions.REMOVE_CONTAINERS_BLANKSPACE)
        .withLatestFrom(this.store.select(state => state.scheduler.events))
        .pipe(
            switchMap(([action, state]) => {
                const containerIds = (<fromActions.RemoveContainersBlankSpace>action).payload.containerIds;
                return this.containersService.removeContainersBlankSpace(containerIds)
                    .pipe(
                        map(response => {
                            const containerEvents: ContainerEvents[] = [];
                            for (const i of containerIds) {
                                if ( state.entities[i] ) {
                                    containerEvents.push(state.entities[i]);
                                }
                            }
                            const dates = this.containersService.getDateBoundsForLoadedContainerEvents(containerEvents);

                            return new fromActions.LoadEvents(
                                {
                                    containerIds: containerIds,
                                    dateTo: dates.maxToDate,
                                    dateFrom: dates.minFromDate
                                });
                        })
                        // TODO catchError()
                    );
            })
        );
}
