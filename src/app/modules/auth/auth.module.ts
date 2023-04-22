import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SingUpComponent } from './sing-up/sing-up.component';
import {MatStepperModule} from "@angular/material/stepper";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule,
        MatStepperModule
    ],
  declarations: [LoginComponent, PasswordResetRequestComponent, PasswordResetComponent, SingUpComponent]
})
export class AuthModule { }
