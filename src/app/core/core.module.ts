import { ApplicationFacadeService } from './../store/application/application-facade.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpInterceptor } from './Interceptors/api-httpinterceptor';
import { NotifyService } from '../shared/services/notify.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
        NotifyService,
        ApplicationFacadeService
    ]
})
export class CoreModule {

}

// @NgModule({})
// export class CoreModule {
//   static forRoot(): ModuleWithProviders {
//     return {
//       ngModule: CoreModule,
//       providers: [
//         { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
//         NotifyService,
//         ApplicationFacadeService
//       ]
//     };
//   }
// }
