import { Validators, AbstractControl } from '@angular/forms';

export class FormValidators extends Validators {
    static noEmptyValue(control: AbstractControl): {[key: string]: any} | null {
        if (control.value) {
            return null;
        }
        control.markAsTouched();
        return { 'noEmptyValue': { value: '' }};
    }
}
