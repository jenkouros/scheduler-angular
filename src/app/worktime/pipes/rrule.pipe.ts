import { Pipe, PipeTransform } from '@angular/core';

import { RRule } from 'rrule';
import { RRhelper } from '../helpers/recurrenceRule.helper';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'rruletotext'
})
export class RRulePipe implements PipeTransform {
  private rr = new RRhelper(environment.locale);

  transform(rruleString: string) {
    if (!rruleString) {
      return;
    }

    const rule = RRule.fromString(rruleString);
    return rule.toText(this.rr.getTextById, this.rr.languageSet);
  }
}
