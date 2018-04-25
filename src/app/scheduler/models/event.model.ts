import {PlannedEventServer} from '../models/server/plannedevent.servermodel';

export class PlannedEvent {
    id: number;
    containerId: number;
    title: string;
    description: string;
    start: Date;
    end: Date;

    static fromServer(event: PlannedEventServer): PlannedEvent {
        const result = new PlannedEvent();
        result.id = event.idPlanItem;
        result.containerId = event.idContainer;
        result.title = event.title;
        result.description = event.comment;
        result.start  = event.timeStartPreparation;
        result.end = event.timeEnd;

        return result;
    }
}

