import { Pipe, PipeTransform } from '@angular/core';

import { RRule } from 'rrule';
import { getTextById, slovenian } from '../helpers/recurrenceRule.helper';

@Pipe({
  name: 'rruletotext'
})
export class RRulePipe implements PipeTransform {
  transform(rruleString: string) {
    if (!rruleString) {
      return;
    }
    const rule = RRule.fromString(rruleString);
    return rule.toText(getTextById, slovenian);
  }
}
