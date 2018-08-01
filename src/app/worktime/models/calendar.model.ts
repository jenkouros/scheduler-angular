export interface Calendar {
  id: number;
  timeStart: Date;
  timeEnd: Date;
  description: string;
  subCalendars: SubCalendar[];
  // subCalendars1: {};
}

export interface SubCalendar {
  id: number;
  idCalendar: number;
  name: string;
}

export interface SelectedContainers {
  id: number;
  containersIds: number[];
}
