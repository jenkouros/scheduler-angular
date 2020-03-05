import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpInterceptor } from './Interceptors/api-httpinterceptor';
import { SharedModule } from '../shared/shared.module';
import { NotifyService } from '../shared/services/notify.service';

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
        NotifyService
    ]
})
export class CoreModule {

}
