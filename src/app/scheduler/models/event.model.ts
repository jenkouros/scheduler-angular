import {PlannedEventServer} from '../models/server/plannedevent.servermodel';

export class PlannedEvent {
    id: number;
    containerId: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;

    static fromServer(event: PlannedEventServer): PlannedEvent {
        const result = new PlannedEvent();
        result.id = event.idPlanItem;
        result.containerId = event.idContainer;
        result.title = event.title;
        result.description = event.comment;
        result.startDate  = event.timeStartPreparation;
        result.endDate = event.timeEnd;

        return result;
    }
}

