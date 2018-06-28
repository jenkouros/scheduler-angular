import * as moment from 'moment';

export class TimeHelper {

    static convertMinutesIntoString(minutes: number) {
        const hours = Math.floor(minutes / 60);
        const minutesLeft = Math.round(minutes % 60);
        let result = hours > 0 ? `${hours}h` : '';
        result = result + ` ${minutesLeft}min`;
        return result;
    }

    static getDateDiffInMinutes(date: Date, biggerDate: Date) {
        return moment(biggerDate).diff(moment(date), 'm');
    }
}
