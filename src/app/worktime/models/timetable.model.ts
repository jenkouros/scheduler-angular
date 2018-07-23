export interface TimeTable {
  id: number;
  idCalendar: number;
  idTimeTableType: number;
  name: string;
  description: string;
  timeStart: Date;
  timeEnd: Date;
  recurrenceRule: string;
}

export interface TimeTableType {
  id: number;
  name: string;
  template?: string;
}
