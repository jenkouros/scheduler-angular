import * as fromCalendars from '../actions/calendars.actions';
import { Calendar } from '../../models/calendar.model';

export interface CalendarsState {
  entities: { [id: number]: Calendar };
  selectedId: number;
  loading: boolean;
  loaded: boolean;
}

export const initialState: CalendarsState = {
  entities: {},
  selectedId: 0,
  loading: false,
  loaded: false
};

// create reducer
export function reducer(
  state = initialState,
  action: fromCalendars.CalendarsActions
): CalendarsState {
  switch (action.type) {
    case fromCalendars.LOAD_CALENDARS: {
      return {
        ...state,
        selectedId: 0,
        loading: true
      };
    }
    case fromCalendars.LOAD_CALENDARS_SUCCESS: {
      const schedules = action.payload;

      const entities = schedules.reduce(
        // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: number]: Calendar }, calendar: Calendar) => {
          return {
            ...entities,
            [calendar.id]: calendar
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
    case fromCalendars.LOAD_CALENDARS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromCalendars.SELECT_CALENDAR: {
      const id = action.payload;
      return {
        ...state,
        selectedId: id
      };
    }
    case fromCalendars.UPDATE_CALENDAR_SUCCESS:
    case fromCalendars.CREATE_CALENDAR_SUCCESS: {
      const calendar = action.payload;
      const entities = {
        ...state.entities,
        [calendar.id]: calendar
      };
      return {
        ...state,
        entities
      };
    }
  }
  return state;
}

// export level of state
export const getCalendarsEntities = (state: CalendarsState) => state.entities;
export const getCalendarsLoading = (state: CalendarsState) => state.loading;
export const getCalendarsLoaded = (state: CalendarsState) => state.loaded;
export const getCalendarsSelectedId = (state: CalendarsState) =>
  state.selectedId;
