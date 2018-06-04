export interface OptionChangedModel {
    component: any;
    name: string;
    fullName: string;
    value: any;
    previousValue: any;
    element: HTMLElement;
    model: any;
}

export interface ResourceOptionChangedModel {
    dataSource: { text: string, id: number }[];
    fieldExpr: string;
}

export const OPTIONCHANGED_RESOURCES = 'resources';
export const OPTIONCHANGED_CURRENTVIEW = 'currentView';
export const OPTIONCHANGED_CURRENTDATE = 'currentDate';
export const OPTIONCHANGED_CELLDURATION = 'cellDuration';
export const OPTIONCHANGED_DATASOURCE = 'dataSource';
export const OPTIONCHANGED_VISIBLE = 'visible';


export const RESOURCES_FIELD = 'containerId';
