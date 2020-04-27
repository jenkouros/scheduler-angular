import * as moment from 'moment';



export class ItemAutoplanRequest {
  idItem: number;
  idSubItem: number;
  timeStart: Date;
  idContainer: number;
  planDay: boolean;

  toSendFormat() {
    return {
      IdItem: this.idItem,
      IdSubItem: this.idSubItem,
      TimeStart: moment(this.timeStart).format(),
      IdContainer: this.idContainer,
      Options: {
        DayPlan: this.planDay
      }
    };
  }
}
