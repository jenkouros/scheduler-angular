const serverUrl = 'http://10.10.20.11:22000';

export const environment = {
  locale: 'sl',
  production: true,
  apiUrl: `${serverUrl}/api`,
  signalRUrl: `${serverUrl}/containershub`,
  parallelOperations: true,
  mode: 'test'
};

export const appSettings = {
  Menu_Plan_Selector: false,
  Menu_Scheduler: true,
  Menu_Scheduler_Items: true,
  Menu_Scheduler_Planner: true,
  Menu_Scheduler_GridPlanner: false,
  Menu_Scheduler_Searcher: true,
  Menu_Scheduler_Filters: false,
  Menu_Scheduler_Groups: false,
  Menu_TimeTables: true,
  Item_EnableHiddingItems: true,
  Item_EnableBatchPlanning: true,
  PlanItem_DisplayOperationFirst: true, // workorder otherwise
  PlanItem_DisplayArticleCode: true, // article name otherwise
  PlanItem_EnablePlanningOnAllWorkplaces: false,
  PlanItems_ExcelExport: true,
  Planning_multiplyTimeWithQuantityFactor: true,
  Planning_calendar_showContainerDescription: true,
  PlanItem_Layout: 0
};
