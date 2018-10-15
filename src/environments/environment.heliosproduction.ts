const serverUrl = 'http://10.9.22.106:9111';

export const environment = {
    production: true,
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
    PlanItem_EnablePlanningOnAllWorkplaces: true
};
