import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxDateBoxModule,
  DxPopupModule,
  DxScrollViewModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxValidationSummaryModule,
  DxValidatorModule
} from 'devextreme-angular';
import { DateboxComponent } from './components/datebox/datebox.component';
import { FieldComponent } from './components/fieldset/field/field.component';
import { FieldsetComponent } from './components/fieldset/fieldset.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PopupComponent } from './components/popup/popup.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';


@NgModule({
    exports: [
        CommonModule,
        NgbModule,
        LoaderComponent,
        FieldsetComponent,
        FieldComponent,
        PopupComponent,
        DateboxComponent,
        ToolbarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,

        DxScrollViewModule,
        DxDateBoxModule,
        DxValidatorModule,
        DxValidationSummaryModule,
        DxCheckBoxModule,
        DxToolbarModule,
        DxButtonModule,
        DxTextBoxModule,
        DxPopupModule
    ],
    declarations: [
        LoaderComponent,
        FieldsetComponent,
        FieldComponent,
        PopupComponent,
        DateboxComponent,
        ToolbarComponent
    ]
})
export class SharedModule {

}
