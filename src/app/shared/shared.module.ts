import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { FieldsetComponent } from './components/fieldset/fieldset.component';
import { FieldComponent } from './components/fieldset/field/field.component';
import { PopupComponent } from './components/popup/popup.component';
import { DxPopupModule, DxScrollViewModule, DxDateBoxModule } from 'devextreme-angular';
import { DateboxComponent } from './components/datebox/datebox.component';

@NgModule({
    exports: [
        CommonModule,
        // NgSelectModule,
        NgbModule,
        // PaginationComponent,
        // PageLengthComponent,
        LoaderComponent,
        FieldsetComponent,
        FieldComponent,
        PopupComponent,
        DateboxComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        // NgSelectModule,
        NgbModule.forRoot(),
        DxPopupModule,
        DxScrollViewModule,
        DxDateBoxModule
    ],
    declarations: [
        // PaginationComponent,
        // PageLengthComponent,
        LoaderComponent,
        FieldsetComponent,
        FieldComponent,
        PopupComponent,
        DateboxComponent
    ]
})
export class SharedModule {

}
