import { PlanGridOperation } from '../models/plan-grid-operation.model';
import { PlannedEventSimple } from '../models/event.model';

export class OperationUpdateHelper {
  static isPlanGridOperationValidToUpdate(operation: PlanGridOperation) {
    return this.isPlannedEventSimpleValidToUpdate({
      idPlanItem: operation.idPlanItem,
      idSubItem: operation.idSubItem,
      code: operation.code,
      containerCode: operation.containerCode,
      idPrePlanItem: operation.idPrePlanItem,
      name: operation.name,
      timeEnd: operation.timeEnd,
      timeStartPreparation: operation.timeStart,
      containerId: operation.idContainer,
      allowParallelPlan: false
    } as PlannedEventSimple);
  }

  static isPlannedEventSimpleValidToUpdate(operation: PlannedEventSimple) {
    if (!operation.containerId || !operation.timeStartPreparation || !operation.timeEnd) {
      return false;
    }

    if (new Date(operation.timeStartPreparation).getTime() > new Date(operation.timeEnd).getTime()) {
      operation.timeEnd = operation.timeStartPreparation;
    }

    return true;
  }

  static validatePlanGridOperation(operation: PlanGridOperation) {
    return this.validatePlannedEventSimple({
      idPlanItem: operation.idPlanItem,
      idSubItem: operation.idSubItem,
      code: operation.code,
      containerCode: operation.containerCode,
      idPrePlanItem: operation.idPrePlanItem,
      name: operation.name,
      timeEnd: operation.timeEnd,
      timeStartPreparation: operation.timeStart,
      containerId: operation.idContainer,
      allowParallelPlan: false
    } as PlannedEventSimple);
  }

  static validatePlannedEventSimple(operation: PlannedEventSimple): { valid: boolean, error?: string } {
    if (!operation.idPlanItem) {
      return { valid: true };
    }

    if (!operation.containerId) {
      return { valid: false, error: 'Delovno mesto je obvezno.' };
    } else if (!operation.timeStartPreparation) {
      return { valid: false, error: 'Čas začetka je obvezen.' };
    } else if (!operation.timeEnd) {
      return { valid: false, error: 'Čas konca je obvezen.' };
    }

    return { valid: true };
  }
}
