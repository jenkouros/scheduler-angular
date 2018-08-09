import { Action } from '@ngrx/store';
import { SubCalendar } from '../../models/calendar.model';

export const LOAD_SUBCALENDARS = '[WorkTime] Load SubCalendars';
export const LOAD_SUBCALENDARS_SUCCESS = '[WorkTime] Load SubCalendars Success';
export const LOAD_SUBCALENDARS_FAIL = '[WorkTime] Load SubCalendars Fail';

export class LoadSubCalendars implements Action {
  readonly type = LOAD_SUBCALENDARS;
}

export class LoadSubCalendarsSuccess implements Action {
  readonly type = LOAD_SUBCALENDARS_SUCCESS;
  constructor(public payload: SubCalendar[]) {}
}

export class LoadSubCalendarsFail implements Action {
  readonly type = LOAD_SUBCALENDARS_FAIL;
  constructor(public payload: any) {}
}

// create subcalendar
export const CREATE_SUBCALENDAR = '[WorkTime] Create SubCalendar';
export const CREATE_SUBCALENDAR_SUCCESS =
  '[WorkTime] Create SubCalendar Success';
export const CREATE_SUBCALENDAR_FAIL = '[WorkTime] Create SubCalendar Fail';

export class CreateSubCalendar implements Action {
  readonly type = CREATE_SUBCALENDAR;
  constructor(public payload: SubCalendar) {}
}
export class CreateSubCalendarSuccess implements Action {
  readonly type = CREATE_SUBCALENDAR_SUCCESS;
  constructor(public payload: SubCalendar) {}
}
export class CreateSubCalendarFail implements Action {
  readonly type = CREATE_SUBCALENDAR_FAIL;
  constructor(public payload: any) {}
}

// update subcalendar
export const UPDATE_SUBCALENDAR = '[WorkTime] Update SubCalendar';
export const UPDATE_SUBCALENDAR_SUCCESS =
  '[WorkTime] Update SubCalendar Success';
export const UPDATE_SUBCALENDAR_FAIL = '[WorkTime] Update SubCalendar Fail';

export class UpdateSubCalendar implements Action {
  readonly type = UPDATE_SUBCALENDAR;
  constructor(public payload: SubCalendar) {}
}
export class UpdateSubCalendarSuccess implements Action {
  readonly type = UPDATE_SUBCALENDAR_SUCCESS;
  constructor(public payload: SubCalendar) {}
}
export class UpdateSubCalendarFail implements Action {
  readonly type = UPDATE_SUBCALENDAR_FAIL;
  constructor(public payload: any) {}
}

// delete calendar
export const REMOVE_SUBCALENDAR = '[WorkTime] Remove SubCalendar';
export const REMOVE_SUBCALENDAR_SUCCESS =
  '[WorkTime] Remove SubCalendar Success';
export const REMOVE_SUBCALENDAR_FAIL = '[WorkTime] Remove SubCalendar Fail';

export class RemoveSubCalendar implements Action {
  readonly type = REMOVE_SUBCALENDAR;
  constructor(public payload: SubCalendar) {}
}
export class RemoveSubCalendarSuccess implements Action {
  readonly type = REMOVE_SUBCALENDAR_SUCCESS;
  constructor(public payload: SubCalendar) {}
}
export class RemoveSubCalendarFail implements Action {
  readonly type = REMOVE_SUBCALENDAR_FAIL;
  constructor(public payload: any) {}
}

// select subcalendar
export const SELECT_SUBCALENDAR = '[WorkTime] Select SubCalendar';

export class SelectSubCalendar implements Action {
  readonly type = SELECT_SUBCALENDAR;
  constructor(public payload: number) {}
}

// editing: select, deselect
export const SELECT_EDIT_SUBCALENDAR = '[WorkTime] Select Edit SubCalendar';
export const DESELECT_EDIT_SUBCALENDAR = '[WorkTime] DeSelect Edit SubCalendar';

export class SelectEditSubCalendar implements Action {
  readonly type = SELECT_EDIT_SUBCALENDAR;
  constructor(public payload: number) {}
}

export class DeSelectEditSubCalendar implements Action {
  readonly type = DESELECT_EDIT_SUBCALENDAR;
}

// popup subcalendar
export const SUBCALENDAR_POPUP_VISIBLE = '[WorkTime] Show subcalendar popup';

export class SubCalendarPopupVisible implements Action {
  readonly type = SUBCALENDAR_POPUP_VISIBLE;
  constructor(public payload: boolean) {}
}

// calendars types
export type SubCalendarsActions =
  | LoadSubCalendars
  | LoadSubCalendarsFail
  | LoadSubCalendarsSuccess
  | CreateSubCalendar
  | CreateSubCalendarSuccess
  | CreateSubCalendarFail
  | UpdateSubCalendar
  | UpdateSubCalendarSuccess
  | UpdateSubCalendarFail
  | RemoveSubCalendar
  | RemoveSubCalendarSuccess
  | RemoveSubCalendarFail
  | SelectSubCalendar
  | SubCalendarPopupVisible
  | SelectEditSubCalendar
  | DeSelectEditSubCalendar;
