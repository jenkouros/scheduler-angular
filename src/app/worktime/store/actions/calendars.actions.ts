import { Action } from '@ngrx/store';
import { Calendar, SubCalendar } from '../../models/calendar.model';

export const LOAD_CALENDARS = '[WorkTime] Load Calendars';
export const LOAD_CALENDARS_SUCCESS = '[WorkTime] Load Calendars Success';
export const LOAD_CALENDARS_FAIL = '[WorkTime] Load Calendars Fail';
export const SELECT_CALENDAR = '[WorkTime] Select Calendar';
export const DESELECT_CALENDAR = '[WorkTime] DeSelect Calendar';

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

export class DeSelectCalendar implements Action {
  readonly type = DESELECT_CALENDAR;
}

// create calendar
export const CREATE_CALENDAR = '[WorkTime] Create Calendar';
export const CREATE_CALENDAR_SUCCESS = '[WorkTime] Create Calendar Success';
export const CREATE_CALENDAR_FAIL = '[WorkTime] Create Calendar Fail';

export class CreateCalendar implements Action {
  readonly type = CREATE_CALENDAR;
  constructor(public payload: Calendar) {}
}
export class CreateCalendarSuccess implements Action {
  readonly type = CREATE_CALENDAR_SUCCESS;
  constructor(public payload: Calendar) {}
}
export class CreateCalendarFail implements Action {
  readonly type = CREATE_CALENDAR_FAIL;
  constructor(public payload: any) {}
}

// update calendar
export const UPDATE_CALENDAR = '[WorkTime] Update Calendar';
export const UPDATE_CALENDAR_SUCCESS = '[WorkTime] Update Calendar Success';
export const UPDATE_CALENDAR_FAIL = '[WorkTime] Update Calendar Fail';

export class UpdateCalendar implements Action {
  readonly type = UPDATE_CALENDAR;
  constructor(public payload: Calendar) {}
}
export class UpdateCalendarSuccess implements Action {
  readonly type = UPDATE_CALENDAR_SUCCESS;
  constructor(public payload: Calendar) {}
}
export class UpdateCalendarFail implements Action {
  readonly type = UPDATE_CALENDAR_FAIL;
  constructor(public payload: any) {}
}

// delete calendar
export const REMOVE_CALENDAR = '[WorkTime] Remove Calendar';
export const REMOVE_CALENDAR_SUCCESS = '[WorkTime] Remove Calendar Success';
export const REMOVE_CALENDAR_FAIL = '[WorkTime] Remove Calendar Fail';

export class RemoveCalendar implements Action {
  readonly type = REMOVE_CALENDAR;
  constructor(public payload: Calendar) {}
}
export class RemoveCalendarSuccess implements Action {
  readonly type = REMOVE_CALENDAR_SUCCESS;
  constructor(public payload: Calendar) {}
}
export class RemoveCalendarFail implements Action {
  readonly type = REMOVE_CALENDAR_FAIL;
  constructor(public payload: any) {}
}

// popup calendar
export const CALENDAR_POPUP_VISIBLE = '[WorkTime] Show calendar popup';
// export const HIDE_CALENDAR_POPUP = '[WorkTime] Hide calendar popup';

export class CalendarPopupVisible implements Action {
  readonly type = CALENDAR_POPUP_VISIBLE;
  constructor(public payload: boolean) {}
}

//
// popup calendar generate
export const CALENDAR_GENERATE_POPUP_VISIBLE = '[WorkTime] Show calendar generate popup';
// export const HIDE_CALENDAR_POPUP = '[WorkTime] Hide calendar popup';

export class CalendarGeneratePopupVisible implements Action {
  readonly type = CALENDAR_GENERATE_POPUP_VISIBLE;
  constructor(public payload: boolean) {}
}

// update subcalendar
export const UPDATE_CALENDAR_SUBCALENDAR = '[WorkTime] Update calendar subcalendar';

export class UpdateCalendarSubCalendar implements Action {
  readonly type = UPDATE_CALENDAR_SUBCALENDAR;
  constructor(public payload: SubCalendar) {}
}
// remove
export const REMOVE_CALENDAR_SUBCALENDAR = '[WorkTime] Remove calendar subcalendar';

export class RemoveCalendarSubCalendar implements Action {
  readonly type = REMOVE_CALENDAR_SUBCALENDAR;
  constructor(public payload: SubCalendar) {}
}

// generate calendar
export const GENERATE_CALENDAR = '[WorkTime] Generate Calendar';
export const GENERATE_CALENDAR_SUCCESS = '[WorkTime] Generate Calendar Success';
export const GENERATE_CALENDAR_FAIL = '[WorkTime] Generate Calendar Fail';

export class GenerateCalendar implements Action {
  readonly type = GENERATE_CALENDAR;
  constructor(public payload: Date) {}
}
export class GenerateCalendarSuccess implements Action {
  readonly type = GENERATE_CALENDAR_SUCCESS;
  constructor(public payload: Boolean) {}
}
export class GenerateCalendarFail implements Action {
  readonly type = GENERATE_CALENDAR_FAIL;
  constructor(public payload: any) {}
}

// calendars types
export type CalendarsActions =
  | LoadCalendars
  | LoadCalendarsFail
  | LoadCalendarsSuccess
  | SelectCalendar
  | DeSelectCalendar
  | CreateCalendar
  | CreateCalendarSuccess
  | CreateCalendarFail
  | UpdateCalendar
  | UpdateCalendarSuccess
  | UpdateCalendarFail
  | RemoveCalendar
  | RemoveCalendarSuccess
  | RemoveCalendarFail
  | CalendarPopupVisible
  | UpdateCalendarSubCalendar
  | RemoveCalendarSubCalendar
  | CalendarGeneratePopupVisible
  | GenerateCalendar
  | GenerateCalendarSuccess
  | GenerateCalendarFail;
