import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { SchedulerComponent } from './scheduler/components';
import { AuthGuard } from './auth/guards';


const appRoutes: Routes = [
    { path: '', redirectTo: '/scheduler/planitems', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'scheduler', loadChildren: () => import('./scheduler/scheduler.module').then(m => m.SchedulerModule), canActivate: [AuthGuard]},
    { path: 'timetables', loadChildren: () => import('./worktime/worktime.module').then(m => m.WorktimeModule), canActivate: [AuthGuard]},
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
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
