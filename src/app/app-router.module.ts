import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { SchedulerComponent } from './scheduler/components';


const appRoutes: Routes = [
    { path: '', redirectTo: '/scheduler', pathMatch: 'full' },
    { path: 'scheduler', loadChildren: './scheduler/scheduler.module#SchedulerModule' }
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
