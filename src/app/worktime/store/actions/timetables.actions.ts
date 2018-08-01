import { Action } from '@ngrx/store';
import { TimeTable } from '../../models/timetable.model';
import { DeselectAllContainers } from '../../../scheduler/store';

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
// select, deselect
export const SELECT_TIMETABLE = '[WorkTime] Select TimeTable';
export const DESELECT_TIMETABLE = '[WorkTime] DeSelect TimeTable';

export class SelectTimeTable implements Action {
  readonly type = SELECT_TIMETABLE;
  constructor(public payload: number) {}
}

export class DeSelectTimeTable implements Action {
  readonly type = DESELECT_TIMETABLE;
}

// popup timetable
export const TIMETABLE_POPUP_VISIBLE = '[WorkTime] Show timetable popup';

export class TimeTablePopupVisible implements Action {
  readonly type = TIMETABLE_POPUP_VISIBLE;
  constructor(public payload: boolean) {}
}

export type TimeTablesActions =
  | LoadTimeTables
  | LoadTimeTablesFail
  | LoadTimeTablesSuccess
  | TimeTablePopupVisible
  | SelectTimeTable
  | DeSelectTimeTable;
