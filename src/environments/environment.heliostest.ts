const serverUrl = 'http://localhost:55501';

export const environment = {
    production: false,
    apiUrl: `${serverUrl}/api`,
    signalRUrl: `${serverUrl}/containershub`,
    parallelOperations: false
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
    Item_EnableHiddingItems: false,
    Item_EnableBatchPlanning: false,
    PlanItem_DisplayOperationFirst: false, // workorder otherwise
    PlanItem_DisplayArticleCode: false  // article name otherwise
};
