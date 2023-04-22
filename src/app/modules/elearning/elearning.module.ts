import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElearningRoutingModule } from './elearning-routing.module';
import {ElearningComponent} from "./elearning.component";
import {SharedModule} from "../../shared/shared.module";
import {MatLineModule} from "@angular/material/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseComponent } from './course/course.component';
import { AccountComponent } from './account/account.component';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    ElearningComponent,
    DashboardComponent,
    CourseComponent,
    AccountComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    ElearningRoutingModule,
    SharedModule,
    MatLineModule
  ]
})
export class ElearningModule { }
