const serverUrl = 'http://10.99.1.54:21010';

export const environment = {
    production: true,
    apiUrl: `${serverUrl}/api`,
    signalRUrl: `${serverUrl}/containershub`,
    parallelOperations: true
};

export const appSettings = {
    Menu_Scheduler: true,
    Menu_Scheduler_Items: true,
    Menu_Scheduler_Planner: true,
    Menu_Scheduler_Searcher: true,
    Menu_Scheduler_Filters: true,
    Menu_Scheduler_Groups: true,
    Menu_TimeTables: true,
    PlanItem_EnablePlanningOnAllWorkplaces: true,
    Item_EnableHiddingItems: true,
    Item_EnableBatchPlanning: true,
    PlanItem_DisplayOperationFirst: true, // workorder otherwise
    PlanItem_DisplayArticleCode: true  // article name otherwise
};
