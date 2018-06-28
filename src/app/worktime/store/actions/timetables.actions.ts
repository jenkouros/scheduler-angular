import { Action } from '@ngrx/store';
import { TimeTable } from '../../models/timetable.model';

export const LOAD_TIMETABLES = '[WorkTime] Load TimeTables';
export const LOAD_TIMETABLES_SUCCESS = '[WorkTime] Load TimeTables Success';
export const LOAD_TIMETABLES_FAIL = '[WorkTime] Load TimeTables Fail';

export class LoadTimeTables implements Action {
  constructor(public payload: number) {}
  readonly type = LOAD_TIMETABLES;
}

export class LoadTimeTablesSuccess implements Action {
  readonly type = LOAD_TIMETABLES_SUCCESS;
  constructor(public payload: TimeTable[]) {}
}

export class LoadTimeTablesFail implements Action {
  readonly type = LOAD_TIMETABLES_FAIL;
  constructor(public payload: any) {}
}

export type TimeTablesActions =
  | LoadTimeTables
  | LoadTimeTablesFail
  | LoadTimeTablesSuccess;
