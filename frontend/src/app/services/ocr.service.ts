import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcrService {

  private apiUrl = 'http://localhost:3000/api/ocr';

  constructor(private http: HttpClient) {}

  // FARM OCR
  ocrFarmDocument(farmId: number, docType: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('farmId', farmId.toString());
    formData.append('docType', docType);
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/farm-document`, formData);
  }

  getFarmDocumentHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/farm-document/history`);
  }

  // LAB OCR
  ocrLabTest(batchId: number, docType: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('batchId', batchId.toString());
    formData.append('docType', docType);
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/lab-test`, formData);
  }

  getLabTestHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lab-test/history`);
  }
}
