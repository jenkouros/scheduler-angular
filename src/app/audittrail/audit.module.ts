import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { DxAutocompleteModule } from 'devextreme-angular';
import { JwtInterceptor } from '../auth/helpers';
import { CoreModule } from '../core/core.module';
import { AuditComponent } from './audit.component';
import { GraphComponent } from './graph/graph.component';
import { ItemSelectorComponent } from './item-selector/item-selector';
import * as fromServices from './services';

const routes: Routes = [
  {
    path: '',
    component: AuditComponent
  }
];

@NgModule({
  declarations: [
    AuditComponent,
    GraphComponent,
    ItemSelectorComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NgxGraphModule,

    DxAutocompleteModule

  ],
  providers: [
    ...fromServices.services,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class AuditModule {}
