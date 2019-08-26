import { NgModule } from '@angular/core';
import { AuthRouterModule } from './auth-router.module';
import { LogInComponent } from './components/login/log-in.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserComponent } from './components/updateuser/update-user/update-user.component';
import { SchedulerModule } from '../scheduler/scheduler.module';

@NgModule({
    imports: [
        CommonModule,
        AuthRouterModule,
        FormsModule,
        ReactiveFormsModule,
        SchedulerModule
    ],
    declarations: [
        LogInComponent,
        UpdateUserComponent
    ]

})
export class AuthModule {
}
