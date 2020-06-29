import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {IUser} from '@shared/interfaces/user.interface';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  getUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>('/api/users');
  }
  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`/api/users/${id}`);
  }
}
