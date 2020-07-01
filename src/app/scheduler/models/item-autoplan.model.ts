import * as moment from 'moment';
import { DictionaryHelper } from '../helpers/dictionary.helper';
import { Container } from './container.dto';



export class ItemAutoplanRequest {
  idItem: number;
  idSubItem: number;
  timeStart: Date;
  idContainer: number;
  planDay: boolean;
  planLinkedItems: boolean;
  planSequencePlanItems: boolean;
  returnOperationGridModel: boolean;

  toSendFormat(filterDictionary: { [id: string]: number[] }, filterContainers: Container[]) {
    const model = {
      IdItem: this.idItem,
      IdSubItem: this.idSubItem,
      TimeStart: moment(this.timeStart).format(),
      IdContainer: this.idContainer,
      PlanLinkedItems: this.planLinkedItems,
      PlanSequenceItems: this.planSequencePlanItems,
      Options: {
        DayPlan: this.planDay,
        ReturnOperationGridModel: this.returnOperationGridModel
      },
      Filter: {}
    };

    if (this.returnOperationGridModel) {
      const containers = filterContainers.map(i => i.id.toString());
      const dict = DictionaryHelper.stringify(filterDictionary);

      model.Filter = {
        Ids: dict.ids,
        Values: dict.values,
        Containers: containers
      };
    }

    return model;
  }
}
