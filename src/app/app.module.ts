import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexModule} from "@angular/flex-layout";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {MatLineModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexModule,
    CoreModule,
    SharedModule,
    LoggerModule.forRoot({
      serverLoggingUrl: `http://my-api/logs`,
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
    MatLineModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
