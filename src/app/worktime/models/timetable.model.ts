export interface TimeTable {
  id: number;
  idCalendar: number;
  idTimeTableType: number;
  name: string;
  description: string;
  timeStart: Date;
  timeEnnd: Date;
}

export interface TimeTableType {
  id: number;
  name: string;
  template?: string;
}
