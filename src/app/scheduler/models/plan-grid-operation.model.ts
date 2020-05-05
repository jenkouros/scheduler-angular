export interface PlanGridOperation {
  idPrePlanItem: number;
  code: string;
  name: string;
  isPlanable: boolean;
  sequenceNumber: number;
  idContainer: number;
  containerCode: string;
  timeEnd: Date;
  timeStart: Date;
  idSubItem: number;
  idPriority: number;
  idUserStatus: number;
  userDate: Date;
  comment: string;
  IdPlanItem: number;
}

export const planGridOperationPriorities = [
    { ID: 0, Name: 'Normalna' },
    { ID: 1, Name: 'Nizka' },
    { ID: 2, Name: 'Visoka' }
  ];

  export const planGridOperationExecution = [
  { ID: 1, Name: 'Planiran' },
  { ID: 2, Name: 'V izvajanju' },
  { ID: 3, Name: 'Končan' },
  { ID: 4, Name: 'V zastoju' },
  { ID: 5, Name: 'Preklican' },
  { ID: 6, Name: 'V niansiranju' }
];

export function getplanGridOperationExecutionColor(id) {
  if (id === 2) {
    return '#ccfbcc';
  } else if (id === 3) {
    return '#d6d6d6';
  } else if (id === 5) {
    return '#ff8383';
  } else if (id === 4) {
    return '#b1b1ff';
  } else if (id === 6) {
    return '#fbe8cc';
  }
}

export function getplanGridOperationPriorityColor(id) {
  if (id === 2) {
    return '#ff8383';
  }
}
