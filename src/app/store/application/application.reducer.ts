import * as fromActions from './application.actions';

export interface ApplicationState {
  loading: boolean;
}

export const initialState: ApplicationState = {
  loading: false
};

export function applicationReducerFn(
  state = initialState,
  action: fromActions.ApplicationActions
): ApplicationState {
  switch (action.type) {
    case fromActions.LOADER_HIDE: {
      return {
        ...state,
        loading: false
      };
    }
    case fromActions.LOADER_SHOW: {
      return {
        ...state,
        loading: true
      };
    }
  }
  return state;
}

export function applicationReducer(
  state = initialState,
  action
): ApplicationState {
  return applicationReducerFn(state, action);
}
