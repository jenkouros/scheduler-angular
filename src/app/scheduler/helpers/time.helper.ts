import * as moment from 'moment';
import { PlanSchedule } from '../models/planschedule.dto';

export class TimeHelper {

    static convertMinutesIntoString(minutes: number) {
        if (!minutes) {
            minutes = 0;
        }
        const hours = Math.floor(minutes / 60);
        const minutesLeft = Math.round(minutes % 60);
        let result = hours > 0 ? `${hours}h` : '';
        result = result + ` ${minutesLeft}min`;
        return result;
    }

    static getDateDiffInMinutes(date: Date, biggerDate: Date) {
        return moment(biggerDate).diff(moment(date), 'm');
    }

    static getCollapsingMarginProcent(notWorkingTimeOrdered: PlanSchedule[], startDate: Date, endDate: Date)
        : { isCollapsing: boolean, data: { startMarginProcent: number, durationMarginProcent: number }[] } {

        const result: { isCollapsing: boolean, data: { startMarginProcent: number, durationMarginProcent: number }[] } = {
            isCollapsing: false,
            data: []
        };
        for (let i = 0; i < notWorkingTimeOrdered.length; i++) {
            if (notWorkingTimeOrdered[i].dateStart < endDate && notWorkingTimeOrdered[i].dateEnd > startDate ) {
                const duration = TimeHelper.getDateDiffInMinutes(startDate, endDate);
                const startShift = notWorkingTimeOrdered[i].dateStart > startDate
                    ? TimeHelper.getDateDiffInMinutes(startDate, notWorkingTimeOrdered[i].dateStart)
                    : 0;
                const durationShift = TimeHelper.getDateDiffInMinutes(
                    notWorkingTimeOrdered[i].dateStart >= startDate ? notWorkingTimeOrdered[i].dateStart : startDate,
                    notWorkingTimeOrdered[i].dateEnd <= endDate ? notWorkingTimeOrdered[i].dateEnd : endDate);

                const startMarginProcent = duration ? Math.round(startShift * 100 / duration) : 0;
                const durationMarginProcent = duration ? Math.round(durationShift * 100 / duration) : 0;

                result.isCollapsing = true;
                result.data.push({
                    startMarginProcent: Math.max(0, startMarginProcent),
                    durationMarginProcent: Math.min(100, durationMarginProcent)
                });

            } else if (endDate <= notWorkingTimeOrdered[i].dateStart) {
                break;
            }
        }

        return result;
    }
}
