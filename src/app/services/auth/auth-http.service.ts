import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ResponseObject} from "../../models/helpers/ResponseObject";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {


  API_AUTH_URL = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<ResponseObject<string>> {
    return this.http.post<ResponseObject<string>>(`${(this.API_AUTH_URL)}/signin`, {
      email,
      password
    });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${(this.API_AUTH_URL)}/register/user`, user);
  }

  getUserByToken(): Observable<any> {
    return this.http.get<any>(`${this.API_AUTH_URL}/me`);
  }

  // Refresh access token
  refreshToken(): Observable<ResponseObject<string>> {
    return this.http.get<ResponseObject<string>>(`${(this.API_AUTH_URL)}/refresh`);
  }

  logout(): Observable<ResponseObject<any>> {
    return this.http.get<ResponseObject<any>>(`${(this.API_AUTH_URL)}/logout`);
  }
}
