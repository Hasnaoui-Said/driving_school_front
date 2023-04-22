import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {delay, map} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import {Observable, of} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  API_AUTH_URL = `${environment.apiUrl}/auth`;
  API_USERS_URL = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient,
              private router: Router,
              @Inject('LOCALSTORAGE') private localStorage: Storage) {
  }

  login(username: string, password: string) {
    let httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
    let body = new HttpParams().set('username', username).set('password', password);
    return this.http.post("http://localhost:9090/login", body, httpOptions)
      .pipe(delay(1000),
        map((response: any) => {
          // @ts-ignore
          let statusCodeValue = response.statusCodeValue;
          if (statusCodeValue == 200) {
            this.setCurrentUser(response.body.data.successJeton, response.body.data.refreshJeton);
            return true;
          } else return false;
        }));
  }

  isTokenExpired(token: string): boolean {
    const decodedToken: any = jwt_decode(token);
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000); // convert to seconds
    return expirationTime < currentTime;
  }

  setCurrentUser(successJeton: string, refreshJeton: string) {
    // const successJeton = response.body.data.successJeton;
    // const refreshJeton = response.body.data.refreshJeton;
    const tokenDecoded: any = jwt_decode(successJeton);
    console.log("store email and jwt token in local storage to keep user logged in between page refreshes", tokenDecoded)
    let email = tokenDecoded.sub, exp = tokenDecoded.exp, iss = tokenDecoded.iss,
      authorities = tokenDecoded.authorities[0];
    console.log(email)
    this.localStorage.setItem('currentUser', JSON.stringify({
      token: successJeton,
      refreshJeton: refreshJeton,
      isAdmin: authorities == "ADMIN",
      email: email,
      iss: iss,
      id: '12312323232',
      alias: email.split('@')[0],
      expiration: exp,
      fullName: email
    }));
  }

  logout(): void {
    this.localStorage.removeItem('currentUser');
    this.router.navigate(['/home'])
  }

  getCurrentUser(): any {
    let currentUser = this.localStorage.getItem('currentUser');
    if (currentUser == null) return null;
    return JSON.parse(currentUser);
  }

  passwordResetRequest(email: string) {
    return of(true).pipe(delay(1000));
  }

  changePassword(email: string, currentPwd: string, newPwd: string) {
    return of(true).pipe(delay(1000));
  }

  passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
    return of(true).pipe(delay(1000));
  }

  getPrincipal(): Observable<any> {
    return this.http.get<any>(`${this.API_AUTH_URL}/principal`);
  }

  refreshToken(): Observable<any> {
    console.log("refresh")
    return this.http.get(`${this.API_AUTH_URL}/refresh`);
  }

  singUp(signUpData: any): Observable<any> {
    return this.http.post(`${this.API_USERS_URL}/`, signUpData)
      .pipe(delay(1000));
  }
}
