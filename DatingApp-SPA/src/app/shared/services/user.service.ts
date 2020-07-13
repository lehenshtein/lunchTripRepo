import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {IPaginatedResult} from '@shared/interfaces/pagination.interface';
import {IUser} from '@shared/interfaces/user.interface';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<IPaginatedResult<IUser>> {
    const paginatedResult = new IPaginatedResult<IUser>();
    let params = new HttpParams();
    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }
    if (likesParam === 'Likers') {
      params = params.append('likers', 'true');
    }
    if (likesParam === 'Likees') {
      params = params.append('likees', 'true');
    }
    return this.http.get<Array<IUser>>('/api/users', {observe: 'response', params}).pipe(
      map(res => {
        paginatedResult.result = res.body;
        if (res.headers.get('Pagination')) {
          paginatedResult.pagination = JSON.parse(res.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
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
  sendLike(id: number, recipientId: number) {
    return this.http.post(`/api/users/${id}/like/${recipientId}`, {});
  }
}
