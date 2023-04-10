import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollspyDirective } from './scrollspy.directive';
import { SharedModule } from '../../shared/shared.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
@NgModule({
  declarations: [HomeComponent, ScrollspyDirective],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ScrollToModule.forRoot(),
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ]
})
export class HomeModule {}
