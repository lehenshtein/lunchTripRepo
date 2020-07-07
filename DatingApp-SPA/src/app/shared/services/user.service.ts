import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {IUser} from '@shared/interfaces/user.interface';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  getUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>('/api/users');
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`/api/users/${id}`);
  }

  updateUser(id: number, user: IUser) {
    return this.http.put(`/api/users/${id}`, user);
  }

  setMainPhoto(userId: number, photoId: number) {
    return this.http.post(`/api/users/${userId}/photos/${photoId}/setMain`, {});
  }

  deletePhoto(userId: number, photoId: number) {
    return this.http.delete(`/api/users/${userId}/photos/${photoId}`);
  }
}
