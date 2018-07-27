import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';

import * as fromScheduler from '../scheduler/store';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface AppState {
  scheduler: fromScheduler.SchedulerState;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export function defaultReducer<T>(state: T) {
  return state;
}
/*
export const initialReducerMap = {
    scheduler: defaultReducer
} as ActionReducerMap<AppState>;
*/
export function getInitialState() {
  return {
    scheduler: fromScheduler.getInitialState()
  };
}
export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

export const initialReducerMap: ActionReducerMap<AppState> = {
  scheduler: fromScheduler.getInitialState,
  routerReducer: fromRouter.routerReducer
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
    console.log('CustomSerializer');
    return { url, queryParams, params };
  }
}
