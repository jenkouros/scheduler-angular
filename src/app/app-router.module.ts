import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { SchedulerComponent } from './scheduler/components';


const appRoutes: Routes = [
    { path: '', redirectTo: '/scheduler/planitems', pathMatch: 'full' },
    { path: 'scheduler', loadChildren: './scheduler/scheduler.module#SchedulerModule' },
    { path: 'worktime', loadChildren: './worktime/worktime.module#WorktimeModule' },
    { path: '**', redirectTo: '/scheduler/planitems' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouterModule {

}
