import { Injectable } from '@angular/core';
import * as fromServices from '../../services';

import * as fromActions from '../actions';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ContainersEffects {
  constructor(
    private actions$: Actions,
    private containersService: fromServices.ContainersService
  ) {}

  @Effect()
  addToSelectedContainers$ = this.actions$
    .ofType(fromActions.ADD_TO_SELECTED_CONTAINERS)
    .pipe(
      switchMap((action: fromActions.AddToSelectedContainers) => {
        const subCalendar = action.payload;
        return this.containersService.addToSelectedContainers(subCalendar).pipe(
          map(schedule => {
            // TODO: mogoče vrne samo success in kličem akcijo AddToSelectedContainersSuccess
            return new fromActions.LoadContainersSuccess(schedule);
          }),
          catchError(error => of(new fromActions.LoadContainersFail(error)))
        );
      })
    );

  @Effect()
  removeSelectedContainers$ = this.actions$
    .ofType(fromActions.REMOVE_FROM_SELECTED_CONTAINERS)
    .pipe(
      switchMap((action: fromActions.RemoveFromSelectedContainers) => {
        const subCalendar = action.payload;
        return this.containersService
          .removeFromSelectedContainers(subCalendar)
          .pipe(
            map(schedule => {
              // TODO: mogoče vrne samo success in kličem akcijo AddToSelectedContainersSuccess
              return new fromActions.LoadContainersSuccess(schedule);
            }),
            catchError(error => of(new fromActions.LoadContainersFail(error)))
          );
      })
    );
}
