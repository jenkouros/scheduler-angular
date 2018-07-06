import { PlanScheduleServer } from './server/planschedule.servermodel';

export class PlanSchedule implements PlanScheduleServer {
    dateStart: Date;
    dateEnd: Date;
    idContainer: number;

    static fromServer(serverData: PlanScheduleServer) {
        const result = new PlanSchedule();
        result.dateEnd = new Date(serverData.dateEnd);
        result.dateStart = new Date(serverData.dateStart);
        result.idContainer = serverData.idContainer;
        return result;
    }
}
