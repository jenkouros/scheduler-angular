import { TimeTable } from '../../models/timetable.model';
import * as fromTimeTables from '../actions/timetables.actions';

export interface TimeTablesState {
  entities: { [id: number]: TimeTable };
  subcalendarId: number;
  loading: boolean;
  loaded: boolean;
}

export const initialState: TimeTablesState = {
  entities: {},
  subcalendarId: 0,
  loading: false,
  loaded: false
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
  }

  return state;
}

// export level of state
export const getTimeTablesEntities = (state: TimeTablesState) => state.entities;
export const getTimeTablesLoading = (state: TimeTablesState) => state.loading;
export const getTimeTablesLoaded = (state: TimeTablesState) => state.loaded;
export const getTimeTablesCalendarId = (state: TimeTablesState) =>
  state.subcalendarId;
