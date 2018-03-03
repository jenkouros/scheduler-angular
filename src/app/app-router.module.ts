import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const appRoutes: Routes = [
    { path: '', redirectTo: 'scheduler', pathMatch: 'full' },
    { path: 'scheduler', loadChildren: './scheduler/scheduler.module#SchedulerModule' }
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