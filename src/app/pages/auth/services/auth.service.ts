import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../model/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = `${environment.api_base_url}`;

  constructor(private http: HttpClient) {}

  postSignUp(data: any) {
    const url = `${this.API_URL}` + '/users';
    return this.http.post(url, data);
  }

  getUsers() {
    const url = `${this.API_URL}` + '/users';
    return this.http.get<Users[]>(url);
  }

  logout() {
    localStorage.clear();
  }
}
