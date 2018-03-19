import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    exports: [
        CommonModule,
        NgSelectModule
    ]
})
export class SharedModule {

}
