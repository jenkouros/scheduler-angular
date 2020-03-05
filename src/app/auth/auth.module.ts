import { NgModule } from '@angular/core';
import { AuthRouterModule } from './auth-router.module';
import { LogInComponent } from './components/login/log-in.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserComponent } from './components/updateuser/update-user/update-user.component';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { DefaultGroupChooserComponent } from './components/updateuser/default-group-chooser/default-group-chooser.component';
import { GroupSelectComponent } from '../scheduler/containers/groups/group.select.component';
import { SettingsComponent } from './components/updateuser/settings.component';

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
        UpdateUserComponent,
        DefaultGroupChooserComponent,
        SettingsComponent
    ]

})
export class AuthModule {
}
