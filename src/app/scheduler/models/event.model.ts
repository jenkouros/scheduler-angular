import {PlannedEventServer} from '../models/server/plannedevent.servermodel';
import { SubItemContainer } from './preplanitem.dto';
import { SubItemContainerServer } from './server/preplanitem.servermodel';

export class PlannedEvent {

    constructor (public id: number, public containerId: number, public title: string,
        public description: string, public startDate: Date, public endDate: Date,
        public containers: SubItemContainerServer[],
        public isPlanned: boolean = false) {
    }

    static fromServer(event: PlannedEventServer): PlannedEvent {
        return new PlannedEvent(
            event.idPlanItem,
            event.idContainer,
            event.title,
            event.comment,
            event.timeStartPreparation,
            event.timeEnd,
            [...event.containers],
            true);
    }
}


