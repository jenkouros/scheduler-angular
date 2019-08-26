import { AppComponentBase } from '../../../../shared/app-component-base';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-group-chooser',
  template: `
    <app-group-select></app-group-select>
  `

})
export class DefaultGroupChooserComponent extends AppComponentBase {
}
