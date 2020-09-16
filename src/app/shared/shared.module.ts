import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { FieldsetComponent } from './components/fieldset/fieldset.component';
import { FieldComponent } from './components/fieldset/field/field.component';
import { PopupComponent } from './components/popup/popup.component';
import { DxPopupModule, DxScrollViewModule, DxDateBoxModule, DxValidatorModule, DxValidationSummaryModule, DxCheckBoxModule, DxToolbarModule } from 'devextreme-angular';
import { DateboxComponent } from './components/datebox/datebox.component';
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
        DxPopupModule,
        DxScrollViewModule,
        DxDateBoxModule,
        DxValidatorModule,
        DxValidationSummaryModule,
        DxCheckBoxModule,
        DxToolbarModule
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
