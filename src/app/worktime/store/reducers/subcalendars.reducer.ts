import * as fromSubCalendars from '../actions/subcalendars.actions';
import { Calendar, SubCalendar } from '../../models/calendar.model';

export interface SubCalendarsState {
  entities: { [id: number]: SubCalendar };
  selectedId: number;
  editingId: number;
  popupVisible: boolean;
  loading: boolean;
  loaded: boolean;
  isDeletePopupVisible: boolean;
}

export const initialState: SubCalendarsState = {
  entities: {},
  selectedId: 0,
  editingId: 0,
  loading: false,
  loaded: false,
  popupVisible: false,
  isDeletePopupVisible: false
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
    case fromSubCalendars.REMOVE_SUBCALENDAR_SUCCESS: {
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
    case fromSubCalendars.DESELECT_SUBCALENDAR: {
      return {
        ...state,
        selectedId: 0
      };
    }
    case fromSubCalendars.SELECT_EDIT_SUBCALENDAR: {
      return {
        ...state,
        editingId: action.payload
      };
    }
    case fromSubCalendars.DESELECT_EDIT_SUBCALENDAR: {
      return {
        ...state,
        editingId: 0
      };
    }
    case fromSubCalendars.SUBCALENDAR_POPUP_VISIBLE: {
      const popupVisible = action.payload;

      return {
        ...state,
        popupVisible
      };
    }
    case fromSubCalendars.SUBCALENDAR_DELETE_POPUP_VISIBLE: {
      //console.log(action.payload);
      return {
        ...state,
        isDeletePopupVisible: action.payload
      };
    }
  }
  return state;
}

// export level of state
export const getSubCalendarsEntities = (state: SubCalendarsState) => state.entities;
export const getSubCalendarsLoading = (state: SubCalendarsState) => state.loading;
export const getSubCalendarsLoaded = (state: SubCalendarsState) => state.loaded;
export const getSubCalendarsSelectedId = (state: SubCalendarsState) => state.selectedId;
export const getSubCalendarsEditingId = (state: SubCalendarsState) => state.editingId;
export const getSubCalendarPopupVisibility = (state: SubCalendarsState) => state.popupVisible;
export const getSubCalendarDeletePopupVisibility = (state: SubCalendarsState) =>
  state.isDeletePopupVisible;
