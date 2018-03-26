import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PageLengthComponent } from './components/page-length/page-length.component';
import { FormsModule } from "@angular/forms";

@NgModule({
    exports: [
        CommonModule,
        NgSelectModule,
        NgbModule,
        PaginationComponent,
        PageLengthComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        NgbModule.forRoot()
    ],
    declarations: [PaginationComponent, PageLengthComponent]
})
export class SharedModule {

}
