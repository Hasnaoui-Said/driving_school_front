import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ElearningComponent} from "./elearning.component";
import {ElearningGuard} from "./elearning.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CourseComponent} from "./course/course.component";
import {AccountComponent} from "./account/account.component";
import {CalendarComponent} from "./calendar/calendar.component";

const routes: Routes = [
  {path: '', component: ElearningComponent,
    children: [
      {path: '', component: DashboardComponent, pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      {path: 'course', component: CourseComponent, pathMatch: 'full'},
      {path: 'account/profile', component: AccountComponent, pathMatch: 'full'},
      {path: 'calendar', component: CalendarComponent, pathMatch: 'full'},
],
    canActivate: [ElearningGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElearningRoutingModule {
}
