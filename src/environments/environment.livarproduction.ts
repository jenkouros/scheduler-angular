const serverUrl = 'http://10.10.20.11:21000';

export const environment = {
    production: true,
    apiUrl: `${serverUrl}/api`,
    signalRUrl: `${serverUrl}/containershub`,
    parallelOperations: true
};

export const appSettings = {
  Menu_Plan_Selector: false,
  Menu_Scheduler: true,
  Menu_Scheduler_Items: true,
  Menu_Scheduler_Planner: true,
  Menu_Scheduler_Searcher: true,
  Menu_Scheduler_Filters: false,
  Menu_Scheduler_Groups: false,
  Menu_TimeTables: true,
  Item_EnableHiddingItems: true,
  Item_EnableBatchPlanning: true,
  PlanItem_DisplayOperationFirst: true, // workorder otherwise
  PlanItem_DisplayArticleCode: true,  // article name otherwise
  PlanItem_EnablePlanningOnAllWorkplaces: false,
  PlanItems_ExcelExport: true
};
