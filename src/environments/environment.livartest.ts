const serverUrl = 'http://10.10.20.11:22000';

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
    Menu_Scheduler_Filters: false,
    Menu_Scheduler_Groups: false,
    Menu_TimeTables: true,
    PlanItem_EnablePlanningOnAllWorkplaces: false,
    Item_EnableHiddingItems: true,
    Item_EnableBatchPlanning: true
};

