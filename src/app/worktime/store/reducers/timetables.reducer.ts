import { TimeTable } from '../../models/timetable.model';
import * as fromTimeTables from '../actions/timetables.actions';

export interface TimeTablesState {
  entities: { [id: number]: TimeTable };
  subcalendarId: number;
  selectedId: number;
  loading: boolean;
  loaded: boolean;
  popupVisible: boolean;
}

export const initialState: TimeTablesState = {
  entities: {},
  subcalendarId: 0,
  selectedId: 0,
  loading: false,
  loaded: false,
  popupVisible: false
};

export function reducer(
  state = initialState,
  action: fromTimeTables.TimeTablesActions
): TimeTablesState {
  switch (action.type) {
    case fromTimeTables.LOAD_TIMETABLES: {
      return {
        ...state,
        subcalendarId: action.payload,
        loading: true,
        loaded: false
      };
    }
    case fromTimeTables.LOAD_TIMETABLES_SUCCESS: {
      const timetables = action.payload;
      let entities = {};
      entities = timetables.reduce(
        // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: number]: TimeTable }, timetable: TimeTable) => {
          return {
            ...entities,
            [timetable.id]: timetable
          };
        },
        {
          // init value, resetiram vedno
          // ...state.entities
        }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromTimeTables.LOAD_TIMETABLES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromTimeTables.UPDATE_TIMETABLE_SUCCESS:
    case fromTimeTables.CREATE_TIMETABLE_SUCCESS: {
      const timetable = action.payload;
      const entities = {
        ...state.entities,
        [timetable.id]: timetable
      };
      return {
        ...state,
        entities
      };
    }
    case fromTimeTables.REMOVE_TIMETABLE: {
      const timetable = action.payload;
      const { [timetable.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }
    case fromTimeTables.TIMETABLE_POPUP_VISIBLE: {
      return {
        ...state,
        popupVisible: action.payload
      };
    }
    case fromTimeTables.SELECT_TIMETABLE: {
      return {
        ...state,
        selectedId: action.payload
      };
    }
    case fromTimeTables.DESELECT_TIMETABLE: {
      return {
        ...state,
        selectedId: 0
      };
    }
  }

  return state;
}

// export level of state
export const getTimeTablesEntities = (state: TimeTablesState) => state.entities;
export const getTimeTablesLoading = (state: TimeTablesState) => state.loading;
export const getTimeTablesSelectdId = (state: TimeTablesState) =>
  state.selectedId;
export const getTimeTablesLoaded = (state: TimeTablesState) => state.loaded;
export const getTimeTablesSubCalendarId = (state: TimeTablesState) =>
  state.subcalendarId;
export const getTimeTablePopupVisibility = (state: TimeTablesState) =>
  state.popupVisible;
