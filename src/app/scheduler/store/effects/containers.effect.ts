import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as fromActions from '../actions';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  mergeMap,
  tap,
  take
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ContainerEvents } from '../../models/event.model';
import { ContainersService } from '../../services/containers.service';
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
  loadContainers$ = this.actions$.ofType(fromActions.LOAD_CONTAINERS)
  .pipe(
    withLatestFrom(this.store.select(state => state.scheduler.filters)),
    switchMap(([action, filters]) => {
      return this.containersService
        .getContainers(filters.selectedEntities, filters.selectedContainers)
        .pipe(
          map(containers => new fromActions.LoadContainersSuccess(containers)),
          catchError(error => of(new fromActions.LoadContainersFail()))
        );
    })
  );


  @Effect()
  loadStatuses$ = this.actions$.ofType(fromActions.LOAD_CONTAINER_STATUSES).pipe(
      switchMap(action => {
          return this.containersService.getStatuses()
              .pipe(
                  map(statuses => new fromActions.LoadContainerStatusesSuccess(statuses)),
                  catchError((error) => {
                      console.log(error);
                      return of(new fromActions.LoadContainersFail());
                  })
              );
      })
    );

  @Effect()
    updateContainer$ = this.actions$.ofType(fromActions.UPDATE_CONTAINER).pipe(
      switchMap((action: fromActions.UpdateContainer) =>
        this.containersService
          .updateContainer(action.payload)
          .pipe(
            map(item => new fromActions.UpdateContainerSuccess(item)),
            catchError(error => of(new fromActions.LoadContainersFail()))
        )
      ));

  @Effect({ dispatch: false })
  removeContainersBlankSpace = this.actions$
    .ofType(fromActions.REMOVE_CONTAINERS_BLANKSPACE)
    .pipe(
      map(
        (action: fromActions.RemoveContainersBlankSpace) =>
          action.payload.containerIds
      ),
      switchMap(containerIds =>
        this.containersService.removeContainersBlankSpace(containerIds)
      )
    );

  @Effect({ dispatch: false })
  reselectContainers = this.actions$
    .ofType(fromActions.RESELECT_CONTAINERS)
    .pipe(
      tap((action: fromActions.ReselectContainers) => {
        this.store.dispatch(new fromActions.DeselectAllContainers());
        this.store.dispatch(new fromActions.SelectContainers(action.payload));
      })
      // mergeMap((action: fromActions.ReselectContainers) => [
      //   new fromActions.DeselectAllContainers(),
      //   new fromActions.SelectContainers(action.payload)
      // ])
    );

  @Effect({ dispatch: false })
  selectContainer = this.actions$
    .ofType(fromActions.SELECT_CONTAINERS)
    .pipe(
      map((action: fromActions.SelectContainers) =>
        this.signalRService.containerSubscribe(action.payload)
      )
    );

  @Effect()
  deselectContainer = this.actions$
      .ofType(fromActions.DESELECT_CONTAINERS)
      .pipe(
          map((action: fromActions.DeselectContainers) => {
              this.signalRService.containerSubscribe(action.payload, false);
              const containerId = action.payload[0];
              return new fromActions.RemoveEventsByContainerId(containerId);
          })
      );

  @Effect({ dispatch : false })
  deselectAllContainer = this.actions$
    .ofType(fromActions.DESELECT_ALL_CONTAINERS)
    .pipe(
      map(action => {
        // this.signalRService.removeSubscriptions();
        // return new fromActions.RemoveEvents();
    }));

  signalRConnection() {
    this.signalRService.connectionStarted$.subscribe(conn =>
      this.store
        .pipe(select(getSelectedContainerSelectList), take(1))
        .subscribe(containers => {
          const containerIds = containers.map(i => i.id);
          if (containerIds && containerIds.length > 0) {
            this.signalRService.containerSubscribe(containerIds);
          }
        })
    );

    // this.store.select(getSelectedContainerSelectList).pipe(
    //     mergeMap(selectedContainers =>
    //         this.signalRService.connectionStarted$.pipe(
    //             map(c => {
    //                 console.log('merge map');
    //                 return selectedContainers.map(i => i.id);
    //             })
    //         )
    //     )
    // ).subscribe(selectedContainers => {
    //     console.log('RE-register to signalR: ' +  selectedContainers);
    //     if (selectedContainers && selectedContainers.length > 0) {
    //         this.signalRService.containerSubscribe(selectedContainers);
    //     }
    // });

    this.signalRService.containerUpdate$.subscribe(containerId => {
      this.store.dispatch(
        new fromActions.ReloadEvents({ containerIds: [containerId] })
      );
    });
  }
}
