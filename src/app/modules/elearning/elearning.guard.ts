import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, Observable, of} from 'rxjs';
import {NotificationService} from "../../core/services/notification.service";
import {AuthenticationService} from "../../core/services/auth.service";
import * as moment from "moment";
import {resolve} from "@angular/compiler-cli";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ElearningGuard implements CanActivate {
  constructor(private router: Router,
              private notificationService: NotificationService,
              private authService: AuthenticationService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    {
      return this.authService.getPrincipal().pipe(
        map((response: { success: any, message: string, data: any }) => {
          if (response.data.role != "USER") {
            this.router.navigate(['admin'])
          }
          return !!response.success || response.data.role != "USER"
        }),
        catchError(() => of(false))
      );
    }
  }

}
