import { Injectable } from '@angular/core';
// import { ContainersService } from '../../services';
import { Actions, Effect } from '@ngrx/effects';
import * as fromActions from '../actions';
import { switchMap, map, catchError, withLatestFrom, mergeMap, tap } from 'rxjs/operators';

import { of } from 'rxjs';

// import { EventsState } from '../reducers/events.reducer';
import { Store } from '@ngrx/store';
import { ContainerEvents } from '../../models/event.model';
import { ContainersService } from '../../services/containers.service';
// import { ContainerState } from '../reducers/containers.reducer';
import { AppState } from '../../../store/app.reducers';
import { SignalRService } from '../../services/signalr.service';
import { getSelectedContainerSelectList } from '..';
import { ContainerSelect } from '../../models/container.viewModel';

@Injectable()
export class ContainersEffects {
    constructor(
        private containersService: ContainersService,
        private actions$: Actions,
        private store: Store<AppState>,
        private signalRService: SignalRService
    ) {
        this.signalRConnection();
    }

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

    @Effect({ dispatch: false })
    removeContainersBlankSpace = this.actions$
        .ofType(fromActions.REMOVE_CONTAINERS_BLANKSPACE)
        .pipe(
            map((action: fromActions.RemoveContainersBlankSpace) => action.payload.containerIds),
            switchMap(containerIds => this.containersService.removeContainersBlankSpace(containerIds))
        );

    @Effect()
    reselectContainers = this.actions$
        .ofType(fromActions.RESELECT_CONTAINERS)
        .pipe(
            mergeMap((action: fromActions.ReselectContainers) => [
                new fromActions.DeselectAllContainers(),
                new fromActions.SelectContainers(action.payload)
            ])
        );

    @Effect({ dispatch : false })
    selectContainer = this.actions$
        .ofType(fromActions.SELECT_CONTAINERS)
        .pipe(
            map((action: fromActions.SelectContainers) =>
                this.signalRService.containerSubscribe(action.payload))
        );

    @Effect({ dispatch : false })
    deselectContainer = this.actions$
        .ofType(fromActions.DESELECT_CONTAINERS)
        .pipe(
            map((action: fromActions.SelectContainers) =>
                this.signalRService.containerSubscribe(action.payload, false))
        );

    @Effect({ dispatch : false })
    deselectAllContainer = this.actions$
        .ofType(fromActions.DESELECT_ALL_CONTAINERS)
        .pipe(
            map(action => this.signalRService.removeSubscriptions())
        );

    signalRConnection() {
        this.store.select(getSelectedContainerSelectList).pipe(
            mergeMap(selectedContainers =>
                this.signalRService.connectionStarted$.pipe(
                    map(c => {
                        console.log('merge map');
                        return selectedContainers.map(i => i.id);
                    })
                )
            )
        ).subscribe(selectedContainers => {
            console.log('RE-register to signalR: ' +  selectedContainers);
            if (selectedContainers && selectedContainers.length > 0) {
                this.signalRService.containerSubscribe(selectedContainers);
            }
        });

        this.signalRService.containerUpdate$.subscribe(containerId => {
            this.store.dispatch(new fromActions.ReloadEvents({containerIds: [containerId]}));
        });
    }
}
