import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { SchedulerComponent } from './scheduler/components';
import { AuthGuard } from './auth/guards';


const appRoutes: Routes = [
    { path: '', redirectTo: '/scheduler/planitems', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'scheduler', loadChildren: './scheduler/scheduler.module#SchedulerModule', canActivate: [AuthGuard]},
    { path: 'timetables', loadChildren: './worktime/worktime.module#WorktimeModule', canActivate: [AuthGuard]},
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: '**', redirectTo: '/scheduler/planitems' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouterModule {

}
