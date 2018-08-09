import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';

import * as fromScheduler from '../scheduler/store';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromWorktime from '../worktime/store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  scheduler: fromScheduler.SchedulerState;
}

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

export const initialReducerMap: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  scheduler: fromScheduler.getInitialState
};

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;
    return { url, queryParams, params };
  }
}
