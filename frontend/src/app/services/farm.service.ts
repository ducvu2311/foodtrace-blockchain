import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FarmService {
  private apiUrl = `${environment.apiUrl}/api/farms`;

  constructor(private http: HttpClient) {}

  searchFarms(query: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, query);
  }

  getFarmById(id: string | number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createFarm(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    if(data.owner_name) formData.append('owner_name', data.owner_name);
    if(data.contact_email) formData.append('contact_email', data.contact_email);
    if(data.contact_phone) formData.append('contact_phone', data.contact_phone);
    if(data.website) formData.append('website', data.website);
    
    return this.http.post(this.apiUrl, formData);
  }

  updateFarm(id: string | number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteFarm(id: string | number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}