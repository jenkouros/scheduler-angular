import { TimeTable } from '../../models/timetable.model';
import * as fromTimeTables from '../actions/timetables.actions';

export interface TimeTablesState {
  entities: { [id: number]: TimeTable };
  loading: boolean;
  loaded: boolean;
}

export const initialState: TimeTablesState = {
  entities: {},
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
        loading: true,
        loaded: false
      };
    }
    case fromTimeTables.LOAD_TIMETABLES_SUCCESS: {
      const timetables = action.payload;
      const entities = timetables.reduce(
        // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: number]: TimeTable }, timetable: TimeTable) => {
          return {
            // ...entities,
            [timetable.id]: timetable
          };
        },
        {
          ...state.entities
        }
      );
      return {
        /*...state,*/
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
export const getTimeTableEntities = (state: TimeTablesState) => state.entities;
