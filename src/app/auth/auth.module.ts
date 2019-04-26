import { NgModule } from '@angular/core';
import { AuthRouterModule } from './auth-router.module';
import { LogInComponent } from './components/login/log-in.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserComponent } from './components/updateuser/update-user/update-user.component';

@NgModule({
    imports: [
        CommonModule,
        AuthRouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LogInComponent,
        UpdateUserComponent
    ]

})
export class AuthModule {
}
