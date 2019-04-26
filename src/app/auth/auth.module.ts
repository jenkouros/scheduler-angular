import { NgModule } from '@angular/core';
import { AuthRouterModule } from './auth-router.module';
import { LogInComponent } from './components/login/log-in.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AuthRouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LogInComponent
    ]

})
export class AuthModule {
}
