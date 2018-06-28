import { Action } from '@ngrx/store';
import { Calendar } from '../../models/calendar.model';

export const LOAD_CALENDARS = '[WorkTime] Load Calendars';
export const LOAD_CALENDARS_SUCCESS = '[WorkTime] Load Calendars Success';
export const LOAD_CALENDARS_FAIL = '[WorkTime] Load Calendars Fail';
export const SELECT_CALENDAR = '[WorkTime] Select Calendar';

export class LoadCalendars implements Action {
  readonly type = LOAD_CALENDARS;
}

export class LoadCalendarsSuccess implements Action {
  readonly type = LOAD_CALENDARS_SUCCESS;
  constructor(public payload: Calendar[]) {}
}

export class LoadCalendarsFail implements Action {
  readonly type = LOAD_CALENDARS_FAIL;
  constructor(public payload: any) {}
}

export class SelectCalendar implements Action {
  readonly type = SELECT_CALENDAR;
  constructor(public payload: number) {}
}

// calendars types
export type CalendarsActions =
  | LoadCalendars
  | LoadCalendarsFail
  | LoadCalendarsSuccess
  | SelectCalendar;
