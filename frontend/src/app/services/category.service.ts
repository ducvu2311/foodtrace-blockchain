import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ENDPOINTS } from './api.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private apiService: ApiService) { }

  getAll(): Observable<any> {
    return this.apiService.get(ENDPOINTS.CATEGORY.BASE);
  }

  search(query: any): Observable<any> {
    return this.apiService.post(ENDPOINTS.CATEGORY.SEARCH, query);
  }

  detail(id: string | number): Observable<any> {
    return this.apiService.get(ENDPOINTS.CATEGORY.BY_ID(id));
  }

  create(data: any): Observable<any> {
    return this.apiService.post(ENDPOINTS.CATEGORY.BASE, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.apiService.put(ENDPOINTS.CATEGORY.BY_ID(id), data);
  }

  delete(id: any): Observable<any> {
    return this.apiService.delete(ENDPOINTS.CATEGORY.BY_ID(id));
  }
}
