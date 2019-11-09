import { Component } from '@angular/core';

export class PlanItemGrid {
  OperationCode: string;
  ContainerCode: string;
  DateStart: Date;
  DateEnd: Date;
  ItemCode: string;
}

export class PlanItemGridModel {
  ItemCode: string;
  Operations: PlanItemGrid[];
  LinkedItemOperations?: PlanItemGrid[];
}

@Component({
  selector: 'app-plan-item-grid',
  templateUrl: './plan-item-grid.component.html'
})
export class PlanItemGridComponent {

  items: PlanItemGrid[] = [
    {
        OperationCode: '#0010 Mletje',
        ContainerCode: 'M1',
        DateStart: new Date(2019, 11, 8, 12, 15),
        DateEnd: new Date(2019, 11, 8, 16, 15),
        ItemCode: '1004321'
    },
    {
      OperationCode: '#0020 Dokončevanje',
      ContainerCode: 'D1',
      DateStart: new Date(2019, 11, 8, 12, 15),
      DateEnd: new Date(2019, 11, 8, 16, 15),
      ItemCode: '1004321'
  }
  ];

  getParentItem() {
    return [
      {
          OperationCode: '#0010 Polnjenje',
          ContainerCode: 'R1',
          DateStart: new Date(2019, 11, 8, 12, 15),
          DateEnd: new Date(2019, 11, 8, 16, 15),
          ItemCode: '1004322'
      }
    ];
  }
}
