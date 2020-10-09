import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';

import * as fromScheduler from '../scheduler/store';
import * as fromPlan from '../plan/store';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromWorktime from '../worktime/store';
import * as fromApplication from './application/application.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  scheduler: fromScheduler.SchedulerState;
  plan: fromPlan.SchedulerPlansState;
  application: fromApplication.ApplicationState;
}

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>(
  'router'
);

export const initialReducerMap: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  scheduler: fromScheduler.getInitialState,
  plan: fromPlan.getInitialState,
  application: fromApplication.applicationReducer
};

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}
