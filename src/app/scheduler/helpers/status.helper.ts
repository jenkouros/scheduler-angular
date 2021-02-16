import { translate } from '../../shared/app-component-base';
import { PlanItemStatusEnum } from '../models/event.model';

export class StatusHelper {
  static getStatusName(idPlanItemStatus: number) {
    switch (idPlanItemStatus) {
      case PlanItemStatusEnum.Running: return translate('PlanItemStatus2');
      case PlanItemStatusEnum.Finished: return translate('PlanItemStatus3');
      case PlanItemStatusEnum.ExternalyClosed: return translate('PlanItemStatus3');
      case PlanItemStatusEnum.Canceled: return translate('PlanItemStatus5');
      case PlanItemStatusEnum.Planned: return translate('PlanItemStatus1');
      case PlanItemStatusEnum.Scheduled: return translate('PlanItemStatus1');
      case PlanItemStatusEnum.Break: return translate('PlanItemStatus4');
    }
  }
}
