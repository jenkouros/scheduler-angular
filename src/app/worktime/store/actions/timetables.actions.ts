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

// create timetable
export const CREATE_TIMETABLE = '[WorkTime] Create TimeTable';
export const CREATE_TIMETABLE_SUCCESS = '[WorkTime] Create TimeTable Success';
export const CREATE_TIMETABLE_FAIL = '[WorkTime] Create TimeTable Fail';

export class CreateTimeTable implements Action {
  readonly type = CREATE_TIMETABLE;
  constructor(public payload: TimeTable) {}
}
export class CreateTimeTableSuccess implements Action {
  readonly type = CREATE_TIMETABLE_SUCCESS;
  constructor(public payload: TimeTable) {}
}
export class CreateTimeTableFail implements Action {
  readonly type = CREATE_TIMETABLE_FAIL;
  constructor(public payload: any) {}
}

// update timetable
export const UPDATE_TIMETABLE = '[WorkTime] Update TimeTable';
export const UPDATE_TIMETABLE_SUCCESS = '[WorkTime] Update TimeTable Success';
export const UPDATE_TIMETABLE_FAIL = '[WorkTime] Update TimeTable Fail';

export class UpdateTimeTable implements Action {
  readonly type = UPDATE_TIMETABLE;
  constructor(public payload: TimeTable) {}
}
export class UpdateTimeTableSuccess implements Action {
  readonly type = UPDATE_TIMETABLE_SUCCESS;
  constructor(public payload: TimeTable) {}
}
export class UpdateTimeTableFail implements Action {
  readonly type = UPDATE_TIMETABLE_FAIL;
  constructor(public payload: any) {}
}

// delete timetable
export const REMOVE_TIMETABLE = '[WorkTime] Remove TimeTable';
export const REMOVE_TIMETABLE_SUCCESS = '[WorkTime] Remove TimeTable Success';
export const REMOVE_TIMETABLE_FAIL = '[WorkTime] Remove TimeTable Fail';

export class RemoveTimeTable implements Action {
  readonly type = REMOVE_TIMETABLE;
  constructor(public payload: TimeTable) {}
}
export class RemoveTimeTableSuccess implements Action {
  readonly type = REMOVE_TIMETABLE_SUCCESS;
  constructor(public payload: TimeTable) {}
}
export class RemoveTimeTableFail implements Action {
  readonly type = REMOVE_TIMETABLE_FAIL;
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

// popup delete timetable
export const TIMETABLE_DELETE_POPUP_VISIBLE =
  '[WorkTime] Show timetable delete popup';

export class TimeTableDeletePopupVisible implements Action {
  readonly type = TIMETABLE_DELETE_POPUP_VISIBLE;
  constructor(public payload: boolean) {}
}

export type TimeTablesActions =
  | LoadTimeTables
  | LoadTimeTablesFail
  | LoadTimeTablesSuccess
  | TimeTablePopupVisible
  | SelectTimeTable
  | DeSelectTimeTable
  | CreateTimeTable
  | CreateTimeTableSuccess
  | CreateTimeTableFail
  | UpdateTimeTable
  | UpdateTimeTableSuccess
  | UpdateTimeTableFail
  | RemoveTimeTable
  | RemoveTimeTableSuccess
  | RemoveTimeTableFail
  | TimeTableDeletePopupVisible;
