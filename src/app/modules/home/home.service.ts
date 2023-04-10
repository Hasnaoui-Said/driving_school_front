import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactModel } from '../../models/Contact.model';

const HOME_API = `${environment.apiUrl}/home`;

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  sendContactform(contact: ContactModel) {
    return this.httpClient.post(`${HOME_API}/sendMessage`, contact);
  }

  getStatistics() {
    return this.httpClient.get(`${HOME_API}/statistics`);
  }
}
