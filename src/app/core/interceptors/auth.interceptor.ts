import {Router} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {HttpRequest} from '@angular/common/http';
import {HttpHandler} from '@angular/common/http';
import {HttpEvent} from '@angular/common/http';
import {delay, map, tap} from 'rxjs/operators';

import {AuthenticationService} from '../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {resetParseTemplateAsSourceFileForTest} from "@angular/compiler-cli/src/ngtsc/typecheck/diagnostics";
import * as moment from "moment";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
              private router: Router,
              private dialog: MatDialog) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const user = this.authService.getCurrentUser();

    if (user && user.token) {
      let cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + user.token)
      });
      if (this.authService.isTokenExpired(user.token)) {
        cloned = req.clone({
          url: `${environment.apiUrl}/auth/refresh`,
          headers: req.headers.set('Authorization',
            'Bearer ' + user.refreshJeton)
        });
      }
      return next.handle(cloned).pipe(tap((res: any) => {
        if (res.url == `${environment.apiUrl}/auth/refresh`) {
          this.authService.setCurrentUser(res.body.successJeton, res.body.refreshJeton)
          location.reload();
          // console.log(this.authService.getCurrentUser())
        }
        return res;
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log(401)
            this.dialog.closeAll();
            this.router.navigate(['/error/401']);
          }
          if (err.status === 403) {
            console.log(403)
            this.dialog.closeAll();
            this.router.navigate(['/error/403']);
          }
        }
      }));

    } else {
      return next.handle(req);
    }
  }
}
