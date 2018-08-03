import { RRule, Weekday, Frequency, Options } from 'rrule';

export class RecurrenceRule {
  static Parse(rfcString): any {
    if (!rfcString) {
      return null;
    }
    // rfcString = rfcString.replace(/^\s+|\s+$/, '');

    let i, j, key, value, attr;
    const attrs = rfcString.split(';');
    const options: any = {};

    for (i = 0; i < attrs.length; i++) {
      attr = attrs[i].split('=');
      key = attr[0];
      value = attr[1];
      switch (key) {
        case 'FREQ':
          options.freq = RRule[value];
          break;
        case 'WKST':
          options.wkst = RRule[value];
          break;
        case 'COUNT':
        case 'INTERVAL':
        case 'BYSETPOS':
        case 'BYMONTH':
        case 'BYMONTHDAY':
        case 'BYYEARDAY':
        case 'BYWEEKNO':
        case 'BYHOUR':
        case 'BYMINUTE':
        case 'BYSECOND':
          if (value.indexOf(',') !== -1) {
            value = value.split(',');
            for (j = 0; j < value.length; j++) {
              if (/^[+-]?\d+$/.test(value[j])) {
                value[j] = Number(value[j]);
              }
            }
          } else if (/^[+-]?\d+$/.test(value)) {
            value = Number(value);
          }
          key = key.toLowerCase();
          options[key] = value;
          break;
        case 'BYDAY': // => byweekday
          let n, wday, day;
          const days = value.split(',');

          options.byweekday = [];
          for (j = 0; j < days.length; j++) {
            day = days[j];
            if (day.length === 2) {
              // MO, TU, ...
              wday = RRule[day]; // wday instanceof Weekday
              options.byweekday.push(wday);
            } else {
              // -1MO, +3FR, 1SO, ...
              day = day.match(/^([+-]?\d)([A-Z]{2})$/);
              n = Number(day[1]);
              wday = day[2];
              wday = RRule[wday].weekday;
              options.byweekday.push(new Weekday(wday, n));
            }
          }
          break;
        /*case 'DTSTART':
              options.dtstart = dateutil.untilStringToDate(value);
              break;
            case 'UNTIL':
              options.until = dateutil.untilStringToDate(value);
              break;
            case 'BYEASTER':
              options.byeaster = Number(value);
              break;
            default:
              throw new Error('Unknown RRULE property \'' + key + '\'');
              */
      }
    }
    return options;
  }
}
