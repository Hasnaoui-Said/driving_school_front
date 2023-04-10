import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from "./admin.component";
import {SharedModule} from "../../shared/shared.module";
import {MatLineModule} from "@angular/material/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalenderComponent } from './calender/calender.component';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';


@NgModule({
  declarations: [AdminComponent, DashboardComponent, CalenderComponent, UsersComponent, UsersListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatLineModule
  ]
})
export class AdminModule { }
