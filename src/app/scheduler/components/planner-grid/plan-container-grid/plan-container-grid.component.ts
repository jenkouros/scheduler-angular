import { Component } from '@angular/core';


export interface ItemGrid {
  itemCode: string;
  articleCode: string;
  articleName: string;
  itemPlanStatus: number;
  quantity: string;
  published: Date;
  lastUpdate: Date;
  itemExecutionStatus: number;
  priority: number;
}

export interface OperationGrid {
  articleCode: string;
  articleName: string;
  operationCode: string;
  containerCode: number;
  dateStart: Date;
  dateEnd: Date;
  itemCode: string;
  executionStatus: number;
  priority: number;
}

export interface PlanItemGridModel {
  item: ItemGrid;
  operations: OperationGrid[];
  linkedItem?: PlanItemGridModel;
}

@Component({
  selector: 'app-plan-container-grid',
  templateUrl: './plan-container-grid.component.html'
})
export class PlanContainerGridComponent {


  priorities = [
    { Name: 'Nizka', ID: 1 },
    { Name: 'Normalna', ID: 2 },
    { Name: 'Visoka', ID: 3 }
  ];

  itemPlanStatuses = [
    { Name: 'Delno planiran', ID: 1 },
    { Name: 'Lansiran', ID: 2 },
    { Name: 'Dokončno planiran', ID: 3 },
  ];

  itemExecutionStatuses = [
    { Name: 'V izvajanju', ID: 1 },
    { Name: 'Končan', ID: 2 },
    { Name: 'Ni podatka', ID: 3 },
    { Name: 'Planiran', ID: 4 }
  ];

  containers = [
    {Code: 'M2', ID: 2},
    {Code: 'M1', ID: 1},
    {Code: 'D1', ID: 3},
    {Code: 'D2', ID: 4},
    {Code: 'Navidezno DM', ID: 5}
  ];

  model: OperationGrid[] = [
    {
      operationCode: '#0010 Mletje',
      containerCode: 1,
      dateStart: new Date(2019, 11, 8, 12, 15),
      dateEnd: new Date(2019, 11, 8, 16, 15),
      executionStatus: 4,
      articleCode: '400678',
      articleName: 'TESSAROL emajl bakreni RAL 8029',
      itemCode: '2699869',
      priority: 3
    },
    {
      operationCode: '#0020 Dokončevanje',
      containerCode: 4,
      dateStart: new Date(2019, 11, 8, 12, 15),
      dateEnd: new Date(2019, 11, 8, 16, 15),
      executionStatus: 4,
      articleCode: '400678',
      articleName: 'TESSAROL emajl bakreni RAL 8029',
      itemCode: '2699869',
      priority: 2

    },
    {
      operationCode: '#0010 Mletje',
      containerCode: 1,
      dateStart: new Date(2019, 11, 8, 12, 15),
      dateEnd: new Date(2019, 11, 8, 16, 15),
      executionStatus: 1,
      articleCode: '400678',
      articleName: 'TESSAROL emajl bakreni RAL 8029',
      itemCode: '1699869',
      priority: 2

    },
    {
      operationCode: '#0020 Dokončevanje',
      containerCode: 5,
      dateStart: new Date(2019, 11, 8, 16, 15),
      dateEnd: new Date(2019, 11, 8, 18, 15),
      executionStatus: 4,
      articleCode: '400678',
      articleName: 'TESSAROL emajl bakreni RAL 8029',
      itemCode: '1699869',
      priority: 2

    }
  ];

  // items: OperationGrid[] = [
  //   {
  //       operationCode: '#0010 Mletje',
  //       containerCode: 1,
  //       dateStart: new Date(2019, 11, 8, 12, 15),
  //       dateEnd: new Date(2019, 11, 8, 16, 15),
  //       itemCode: '1004321'
  //   },
  //   {
  //     operationCode: '#0020 Dokončevanje',
  //     containerCode: 4,
  //     dateStart: new Date(2019, 11, 8, 12, 15),
  //     dateEnd: new Date(2019, 11, 8, 16, 15),
  //     itemCode: '1004321'
  // }
  // ];


  applyCellStyles(e) {
    if (e.rowType !== 'data') {
      return;
    }

    switch (e.columnIndex) {
      case 5: {
        e.cellElement.style.background = this.getItemPlanStatusColor(e.data.item.itemPlanStatus);
        break;
      }
      case 6: {
        e.cellElement.style.background = this.getItemExecutionStatusColor(e.data.item.itemExecutionStatus);
        break;
      }
      case 7: {
        e.cellElement.style.background = this.getPriorityColor(e.data.item.priority);
        break;
      }
    }
  }

  applyPlanItemStyles(e) {
    if (e.rowType !== 'data') {
      return;
    }

    switch (e.columnIndex) {
      // case 1: {
      //   e.cellElement.style.background = this.getContainerColor(e.data.containerCode);
      //   break;
      // }
      case 4: {
        e.cellElement.style.background = this.getItemExecutionStatusColor(e.data.executionStatus);
        break;
      }
      case 5: {
        e.cellElement.style.background = this.getPriorityColor(e.data.priority);
        break;
      }
    }
  }

  getItemExecutionStatusColor(id) {
    if (id === 1) {
      return '#ccfbcc';
    } else if (id === 2) {
      return '#d6d6d6';
    }
  }

  getItemPlanStatusColor(id) {
    if (id === 2) {
      return '#b1b1ff';
    } else if (id === 1) {
      return '#fbe8cc';
    } else if (id === 3) {
      return '#d6d6d6';
    }
  }

  getPriorityColor(id) {
    if (id === 3) {
      return '#ff8383';
    }
  }

  getContainerColor(id) {
    if (id === 5) {
      return '#fbe8cc';
    }
  }
}
