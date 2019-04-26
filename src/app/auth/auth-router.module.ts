import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/login/log-in.component';
import { UpdateUserComponent } from './components/updateuser/update-user/update-user.component';
import { AuthGuard } from './guards';

const authRoutes = [
    { path: '', component: LogInComponent },
    { path: 'updateuser', component: UpdateUserComponent, canActivate: [AuthGuard]}

];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRouterModule {

}
