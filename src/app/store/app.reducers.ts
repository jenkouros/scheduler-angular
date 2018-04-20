import * as fromScheduler from '../scheduler/store';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    scheduler: fromScheduler.SchedulerState;
}

export function defaultReducer<T>(state: T) { return state; }
export const initialReducerMap = {
    scheduler: defaultReducer
} as ActionReducerMap<AppState>;

export function getInitialState() {
    return {
        scheduler: fromScheduler.getInitialState()
    };
}
