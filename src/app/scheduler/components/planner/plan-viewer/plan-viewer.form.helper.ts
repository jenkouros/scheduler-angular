import * as moment from 'moment';
import { PlannedEvent } from '../../../models/event.model';
import { TimeHelper } from '../../../helpers/time.helper';
import { SubItemContainer } from '../../../models/subitem.dto';

export class PlanViewerFormHelper {

  static preparationStartTime: Date;
  static executionStartTime: Date;
  static executionEndTime: Date;
  static startDate: Date;
  static endDate: Date;
  static selectedContainer: SubItemContainer | undefined;
  static quantity: number;

  static getPreparationNormative() {
    return PlanViewerFormHelper.selectedContainer ? PlanViewerFormHelper.selectedContainer.preparationNormative : 0;
  }
  static getExecutionNormative() {
    return PlanViewerFormHelper.selectedContainer
      ? (PlanViewerFormHelper.selectedContainer.executionNormative /
        Math.max(PlanViewerFormHelper.selectedContainer.quantity, 1)) * PlanViewerFormHelper.quantity
      : 0;
  }
  private static updatePreparationDurationField(form) {
    form.getEditor('preparationTime').option('value',
      TimeHelper.convertMinutesIntoString(moment(PlanViewerFormHelper.executionStartTime)
        .diff(moment(PlanViewerFormHelper.preparationStartTime), 'm')));
  }
  private static updateExecutionDurationField(form) {
    form.getEditor('executionTime').option('value',
      TimeHelper.convertMinutesIntoString(moment(PlanViewerFormHelper.executionEndTime)
        .diff(moment(PlanViewerFormHelper.executionStartTime), 'm')));
  }
  private static updatePreparationStartTimeField(form, date: Date) {
    PlanViewerFormHelper.startDate = date;
    PlanViewerFormHelper.preparationStartTime = date;
    const preparationTimeLock = form.getEditor('preparationTimeLock').option('value');
    if (preparationTimeLock) {
      const updatedTimeStartCandidate = moment(PlanViewerFormHelper.preparationStartTime)
        .add(PlanViewerFormHelper.getPreparationNormative(), 'm').toDate();

      if (updatedTimeStartCandidate.getTime() !== PlanViewerFormHelper.executionStartTime.getTime()) {
        form.getEditor('timeStartExecution').option('value', updatedTimeStartCandidate);
        PlanViewerFormHelper.updatePreparationDurationField(form);
      }
    } else {
      PlanViewerFormHelper.updatePreparationDurationField(form);
    }
  }
  private static updateExecutionStartTimeField(form, date: Date) {

    PlanViewerFormHelper.executionStartTime = date;
    const executionTimeLock = form.getEditor('executionTimeLock').option('value');
    if (executionTimeLock) {
      const updatedTimeEndCandidate = moment(PlanViewerFormHelper.executionStartTime)
        .add(PlanViewerFormHelper.getExecutionNormative(), 'm').toDate();
      if (updatedTimeEndCandidate.getTime() !== PlanViewerFormHelper.executionEndTime.getTime()) {
        form.getEditor('timeEndExecution').option('value', updatedTimeEndCandidate);
      } else {
        PlanViewerFormHelper.updateExecutionDurationField(form);
      }
    } else {
      PlanViewerFormHelper.updateExecutionDurationField(form);
    }

    const preparationTimeLock = form.getEditor('preparationTimeLock').option('value');
    if (preparationTimeLock) {
      const updatedTimePreparationCandidate = moment(PlanViewerFormHelper.executionStartTime)
        .subtract(PlanViewerFormHelper.getPreparationNormative(), 'm').toDate();
      if (updatedTimePreparationCandidate.getTime() !== PlanViewerFormHelper.preparationStartTime.getTime()) {
        form.getEditor('timeStartPreparation').option('value', updatedTimePreparationCandidate);
      } else {
        PlanViewerFormHelper.updatePreparationDurationField(form);
      }
    } else {
      PlanViewerFormHelper.updatePreparationDurationField(form);
    }
  }
  private static updateExecutionEndTimeField(form, date: Date) {
    PlanViewerFormHelper.endDate = date;
    PlanViewerFormHelper.executionEndTime = date;
    const executionTimeLock = form.getEditor('executionTimeLock').option('value');
    if (executionTimeLock) {
      const updatedTimeExecutionStartCandidate = moment(PlanViewerFormHelper.executionEndTime)
        .subtract(PlanViewerFormHelper.getExecutionNormative(), 'm').toDate();
      if (updatedTimeExecutionStartCandidate.getTime() !== PlanViewerFormHelper.executionStartTime.getTime()) {
        form.getEditor('timeStartExecution').option('value', updatedTimeExecutionStartCandidate);
        PlanViewerFormHelper.updateExecutionDurationField(form);
      }

    } else {
      PlanViewerFormHelper.updateExecutionDurationField(form);
    }
  }

  static generateForm(data) {
    const that = this;
    const form = data.form;
    const model: PlannedEvent = data.appointmentData;
    const containers = model.containers;
    PlanViewerFormHelper.selectedContainer = containers.find(
      item => model.containerId === item.container.id
    );

    PlanViewerFormHelper.preparationStartTime = new Date(model.timeStartPreparation);
    PlanViewerFormHelper.executionStartTime = new Date(model.timeStartExecution);
    PlanViewerFormHelper.executionEndTime = new Date(model.timeEndExecution);
    PlanViewerFormHelper.endDate = PlanViewerFormHelper.executionEndTime;
    PlanViewerFormHelper.startDate = PlanViewerFormHelper.preparationStartTime;
    PlanViewerFormHelper.quantity = model.quantity;

    form.option('items', [
      {
        label: {
          text: 'Operacija'
        },
        dataField: 'subItemName',
        editorType: 'dxTextBox',
        editorOptions: {
          readOnly: true,
        }
      },
      {
        label: {
          text: 'Količina'
        },
        editorType: 'dxTextBox',
        editorOptions: {
          value: model.quantity + ' ' + model.unitQuantity,
          readOnly: true
        }
      },
      {
        label: {
          text: 'Delovno mesto'
        },
        editorType: 'dxSelectBox',
        dataField: 'containerId',
        editorOptions: {
          items: containers,
          displayExpr: (subItemContainer: SubItemContainer) => {
            return `${subItemContainer.container.code} ${subItemContainer.container.name}`;
          },
          valueExpr: 'container.id',
          onValueChanged: function(args) {
            PlanViewerFormHelper.selectedContainer = containers.find(
              item => args.value === item.container.id
            );
            PlanViewerFormHelper.updatePreparationStartTimeField(form, PlanViewerFormHelper.preparationStartTime);

          }.bind(this)
        }
      },
      {
        label: {
          text: 'Začetek priprave'
        },
        dataField: 'timeStartPreparation',
        editorType: 'dxDateBox',
        editorOptions: {
          validationRules: [
            {
              type: 'required',
              message: 'Začetek priprave je obvezen.'
            }
          ],
          type: 'datetime',
          onValueChanged: function(args) {
            PlanViewerFormHelper.updatePreparationStartTimeField(form, new Date(args.value));
          }
        }
      },
      {
        label: {
          text: 'Čas priprave'
        },
        dataField: 'preparationTime',
        editorType: 'dxTextBox',
        cssClass: 'col-6 ml-5',
        editorOptions: {
          value: TimeHelper.convertMinutesIntoString(moment(PlanViewerFormHelper.executionStartTime)
            .diff(moment(PlanViewerFormHelper.preparationStartTime), 'm')),
          readOnly: true
        }
      },
      {
        label: {
          text: 'Zakleni normativ'
        },
        dataField: 'preparationTimeLock',
        editorOptions: {
          value: true
        },
        cssClass: 'col-6  ml-5',
        editorType: 'dxCheckBox',
      },
      {
        label: {
          text: 'Začetek izdelave'
        },
        dataField: 'timeStartExecution',
        editorType: 'dxDateBox',
        editorOptions: {
          // value: moment(PlanViewerFormHelper.preparationStartTime.getTime())
          //   .add(PlanViewerFormHelper.getPreparationNormative(), 'm'),
          validationRules: [
            {
              type: 'required',
              message: 'Začetek izdelave je obvezen.'
            }
          ],
          type: 'datetime',
          onValueChanged: function(args) {
            PlanViewerFormHelper.updateExecutionStartTimeField(form, new Date(args.value));
          }
        }
      },
      {
        label: {
          text: 'Čas izdelave'
        },
        cssClass: 'col-6  ml-5',
        dataField: 'executionTime',
        editorType: 'dxTextBox',
        editorOptions: {
          value: TimeHelper.convertMinutesIntoString(moment(PlanViewerFormHelper.executionEndTime)
            .diff(moment(PlanViewerFormHelper.executionStartTime), 'm')),
          readOnly: true
        }
      },
      {
        dataField: 'executionTimeLock',
        label: {
          text: 'Zakleni normativ'
        },
        editorOptions: {
          value: true
        },
        cssClass: 'col-6  ml-5',
        editorType: 'dxCheckBox',
      },
      {
        label: {
          text: 'Konec izdelave'
        },
        dataField: 'timeEndExecution',
        editorType: 'dxDateBox',
        editorOptions: {
          type: 'datetime',
          onValueChanged: function(args) {
            PlanViewerFormHelper.updateExecutionEndTimeField(form, new Date(args.value));
          }
        }
      }
    ]);
  }
}
