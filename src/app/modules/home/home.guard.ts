import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from "moment/moment";
import {NotificationService} from "../../core/services/notification.service";
import {AuthenticationService} from "../../core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private router: Router,
              private notificationService: NotificationService,
              private authService: AuthenticationService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    {
      const user = this.authService.getCurrentUser();
      if (user && user.expiration) {
        if (moment() < moment(user.expiration)) {
          return true;
        } else {
          this.router.navigate(['elearning'])
          return false;
        }
      }
      return true;
    }
  }

}
