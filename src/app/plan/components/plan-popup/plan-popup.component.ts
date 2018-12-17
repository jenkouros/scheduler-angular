import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Plan } from '../../models';

@Component({
  selector: 'app-plan-popup',
  templateUrl: './plan-popup.component.html',
  styleUrls: ['./plan-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanPopupComponent implements OnChanges {
  @Input()
  plan: Plan;
  @Input()
  visible: boolean;
  @Output()
  update = new EventEmitter<Plan>();
  @Output()
  cancel = new EventEmitter<boolean>();

  exists = false;
  header: string;

  constructor(private fb: FormBuilder) {
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnChanges(changes: SimpleChanges) {
    this.exists = false;
    this.form.reset();
    /* ni urejanje zaenkrat
    if (this.plan && this.plan.idPlan) {
      this.exists = true;

      this.form.patchValue(this.plan);
    }*/
    this.header = this.exists ? 'Urejanje plana' : 'Kreiranje plana';
  }

  onSubmit() {
    const { value } = this.form;
    if (this.validToConfirm()) {
      // update
      this.update.emit({ ...this.plan, ...value });
    }
  }

  validToConfirm() {
    const { valid, touched } = this.form;
    if (!this.exists) {
      return valid;
    } else {
      return touched && valid;
    }
  }

  onCancel() {
    this.cancel.emit(false);
  }

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.invalid;
  }

  get descControl() {
    return this.form.get('description') as FormControl;
  }

  get descControlInvalid() {
    return this.nameControl.invalid;
  }
}
