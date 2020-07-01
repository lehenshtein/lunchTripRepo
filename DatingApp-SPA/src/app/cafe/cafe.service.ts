import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CafeService {

  constructor(
    private http: HttpClient
  ) {
  }

  createCafe(data) {
    return this.http.post('api/cafe', data);
  }

  updateCafe(id: number, data) {
    return this.http.put(`/api/cafe/${id}`, data);
  }
}
