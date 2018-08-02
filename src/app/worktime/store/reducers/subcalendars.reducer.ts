import * as fromSubCalendars from '../actions/subcalendars.actions';
import { Calendar, SubCalendar } from '../../models/calendar.model';

export interface SubCalendarsState {
  entities: { [id: number]: SubCalendar };
  selectedId: number;
  loading: boolean;
  loaded: boolean;
}

export const initialState: SubCalendarsState = {
  entities: {},
  selectedId: 0,
  loading: false,
  loaded: false
};

// create reducer
export function reducer(
  state = initialState,
  action: fromSubCalendars.SubCalendarsActions
): SubCalendarsState {
  switch (action.type) {
    case fromSubCalendars.LOAD_SUBCALENDARS: {
      return {
        ...state,
        selectedId: 0,
        loading: true
      };
    }
    case fromSubCalendars.LOAD_SUBCALENDARS_SUCCESS: {
      const schedules = action.payload;

      const entities = schedules.reduce(
        // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: number]: SubCalendar }, subCalendar: SubCalendar) => {
          return {
            ...entities,
            [subCalendar.id]: subCalendar
          };
        },
        {
          ...state.entities
        }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromSubCalendars.LOAD_SUBCALENDARS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromSubCalendars.UPDATE_SUBCALENDAR_SUCCESS:
    case fromSubCalendars.CREATE_SUBCALENDAR_SUCCESS: {
      const subCalendar = action.payload;
      const entities = {
        ...state.entities,
        [subCalendar.id]: subCalendar
      };
      return {
        ...state,
        entities
      };
    }
    case fromSubCalendars.REMOVE_SUBCALENDAR: {
      const subCalendar = action.payload;
      const { [subCalendar.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }
    case fromSubCalendars.SELECT_SUBCALENDAR: {
      const id = action.payload;
      return {
        ...state,
        selectedId: id
      };
    }
  }
  return state;
}

// export level of state
export const getSubCalendarsEntities = (state: SubCalendarsState) =>
  state.entities;
export const getSubCalendarsLoading = (state: SubCalendarsState) =>
  state.loading;
export const getSubCalendarsLoaded = (state: SubCalendarsState) => state.loaded;
export const getSubCalendarsSelectedId = (state: SubCalendarsState) =>
  state.selectedId;
