import { Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

export class DateValidators extends Validators {
    static validateDate(control: AbstractControl): {[key: string]: any} | null {
        return control.value !== NaN && control.value instanceof Date && !isNaN(control.value.getTime())
            ? null
            : { 'invalidDate': { value: control.value }};
    }


    static maxDate(refDateKey: string, maxDateKey: string) {
        return (group: FormGroup) => {
            const refDate = group.controls[refDateKey];
            const maxDate = group.controls[maxDateKey];

            if (!refDate || !maxDate) {
                console.error('Invalid form group key name');
                return;
            }

            if (!maxDate.value || !refDate.value) { return; }

            if (maxDate.value.getTime() < refDate.value.getTime()) {
                refDate.setErrors({
                    'maxDateOverflow': { value: maxDate.value }
                });
            } else {
                refDate.setErrors(null);
            }
        };
    }

    static minDate(refDateKey: string, minDateKey: string) {
        return (group: FormGroup) => {
            const refDate = group.controls[refDateKey];
            const minDate = group.controls[minDateKey];

            if (!refDate || !minDate) {
                console.error('Invalid form group key name');
                return null;
            }

            if (!minDate.value || !refDate.value) { return null; }

            if (minDate.value.getTime() > refDate.value.getTime()) {
                return ({
                    'minDateOverflow': { value: minDate.value }
                });
            }
            return null;
        };
    }

}
