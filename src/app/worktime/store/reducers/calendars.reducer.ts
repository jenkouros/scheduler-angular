import * as fromCalendars from '../actions/calendars.actions';
import {
  Calendar,
  SubCalendar,
  CalendarEntity
} from '../../models/calendar.model';
import { SubCalendarItemComponent } from '../../components';

export interface CalendarsState {
  entities: { [id: number]: Calendar };
  selectedId: number;
  popupVisible: boolean;
  loading: boolean;
  loaded: boolean;
}

export const initialState: CalendarsState = {
  entities: {},
  selectedId: 0,
  popupVisible: false,
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
          const newSubCalendar: {
            [id: number]: SubCalendar;
          } = calendar.subCalendars.reduce(
            (
              subCalendars: { [id: number]: SubCalendar },
              subCalendar: SubCalendar
            ) => {
              console.log({ [subCalendar.idCalendar]: subCalendar });
              return {
                ...subCalendars,
                [subCalendar.id]: subCalendar
              };
            },
            {}
          );
          const newCalendar = {
            ...calendar,
            subCalendars: newSubCalendar
          };
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

    case fromCalendars.DESELECT_CALENDAR: {
      return {
        ...state,
        selectedId: 0
      };
    }

    case fromCalendars.UPDATE_CALENDAR_SUCCESS:
    case fromCalendars.CREATE_CALENDAR_SUCCESS: {
      const calendar = action.payload;
      console.log(calendar);
      const entities = {
        ...state.entities,
        [calendar.id]: calendar
      };
      return {
        ...state,
        entities
      };
    }
    case fromCalendars.CALENDAR_POPUP_VISIBLE: {
      const popupVisible = action.payload;
      console.log('reducer visibility', popupVisible);
      return {
        ...state,
        popupVisible
      };
    }
    case fromCalendars.UPDATE_SUBCALENDAR_SUCCESS:
    case fromCalendars.CREATE_SUBCALENDAR_SUCCESS: {
      const subCalendar = action.payload;
      const subCalendars = {
        ...state.entities[subCalendar.idCalendar].subCalendars,
        [subCalendar.id]: subCalendar
      };

      const calendar = {
        ...state.entities[subCalendar.idCalendar],
        subCalendars
      };
      console.log(calendar);

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
export const getCalendarPopupVisibility = (state: CalendarsState) =>
  state.popupVisible;
export const getCalendarsSelectedId = (state: CalendarsState) =>
  state.selectedId;
