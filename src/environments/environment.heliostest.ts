const serverUrl = 'http://10.9.22.106:9188';

export const environment = {
    locale: 'sl',
    production: true,
    apiUrl: `${serverUrl}/api`,
    signalRUrl: `${serverUrl}/containershub`,
    parallelOperations: false,
    mode: 'test'
};

export const appSettings = {
  Menu_Plan_Selector: false,
  Menu_Scheduler: true,
  Menu_Scheduler_Items: true,
  Menu_Scheduler_Planner: true,
  Menu_Scheduler_GridPlanner: true,
  Menu_Scheduler_Searcher: true,
  Menu_Scheduler_Filters: true,
  Menu_Scheduler_Groups: true,
  Menu_TimeTables: true,
  Item_EnableHiddingItems: false,
  Item_EnableBatchPlanning: false,
  PlanItem_DisplayOperationFirst: false, // workorder otherwise
  PlanItem_DisplayArticleCode: false,  // article name otherwise
  PlanItem_EnablePlanningOnAllWorkplaces: true,
  PlanItems_ExcelExport: false,
  Planning_multiplyTimeWithQuantityFactor: true
};
