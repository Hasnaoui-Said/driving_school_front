import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AdminGuard} from "./admin.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsersComponent} from "./users/users.component";
import {CalenderComponent} from "./calender/calender.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {path:'', component: DashboardComponent, pathMatch: 'full'},
      {path:'dashboard', component: DashboardComponent, pathMatch: 'full'},
      {path:'calender', component: CalenderComponent, pathMatch: 'full'},
      {path:'users', component: UsersComponent, pathMatch: 'full'},
    ], canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
