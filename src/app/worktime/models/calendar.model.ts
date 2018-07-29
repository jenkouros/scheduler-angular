export interface Calendar {
  id: number;
  timeStart: Date;
  timeEnd: Date;
  description: string;
  subCalendars: SubCalendar[];
  // subCalendars1: {};
}

export interface CalendarEntity {
  id: number;
  timeStart: Date;
  timeEnd: Date;
  description: string;
  subCalendars: { [id: number]: SubCalendar }[];
  // subCalendars1: {};
}

export interface SubCalendar {
  id: number;
  idCalendar: number;
  name: string;
}
