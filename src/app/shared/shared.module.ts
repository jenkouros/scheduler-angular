import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PageLengthComponent } from './components/page-length/page-length.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { FieldsetComponent } from './components/fieldset/fieldset.component';
import { FieldComponent } from './components/fieldset/field/field.component';
import { PopupComponent } from './components/popup/popup.component';
import { DxPopupModule, DxScrollViewModule } from 'devextreme-angular';

@NgModule({
    exports: [
        CommonModule,
        NgSelectModule,
        NgbModule,
        PaginationComponent,
        PageLengthComponent,
        LoaderComponent,
        FieldsetComponent,
        FieldComponent,
        PopupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        NgbModule.forRoot(),
        DxPopupModule,
        DxScrollViewModule
    ],
    declarations: [
        PaginationComponent,
        PageLengthComponent,
        LoaderComponent,
        FieldsetComponent,
        FieldComponent,
        PopupComponent
    ]
})
export class SharedModule {

}
