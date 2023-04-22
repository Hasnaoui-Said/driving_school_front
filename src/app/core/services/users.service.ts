import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  API_AUTH_URL = `${environment.apiUrl}/users/`;
  constructor(private http: HttpClient,
              private router: Router,
              @Inject('LOCALSTORAGE') private localStorage: Storage) {
  }

  getUsersPage(pageIndex: number, pageSize: number): Observable<any> {
    const params = { page: pageIndex.toString(), size: pageSize.toString() };
    return this.http.get(this.API_AUTH_URL, { params });
  }

  getUsers():Observable<any> {
    return this.http.get(this.API_AUTH_URL);
  }
  changeStateUser(uuid: String, state: String): Observable<any> {
    return this.http.put(`${this.API_AUTH_URL}state/${uuid}`, state);
  }
}
