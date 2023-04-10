import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, Observable, of} from 'rxjs';
import {map} from "rxjs/operators";
import {NotificationService} from "../../core/services/notification.service";
import {AuthenticationService} from "../../core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router,
              private notificationService: NotificationService,
              private authService: AuthenticationService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getPrincipal().pipe(
      map((response: { success: boolean, message: string, data:any}) => {
        if (response.data.role != "ADMIN"){
          this.router.navigate(['elearning'])
        }
        return response.success || response.data.role != "ADMIN";
      }),
      catchError(() => {
        console.log("catchError");
        return of(false)
      })
    );
  }

}
