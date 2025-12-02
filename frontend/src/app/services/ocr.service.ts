import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OcrService {
  private baseUrl = 'http://localhost:3000/api/ocr';

  constructor(private http: HttpClient) {}

  uploadLab(file: File, batchId?: number) {
    const fd = new FormData();
    fd.append('file', file);
    if (batchId) fd.append('batch_id', String(batchId));
    return this.http.post(`${this.baseUrl}/lab/upload`, fd);
  }

  uploadFarm(file: File, farmId?: number, docType?: string) {
    const fd = new FormData();
    fd.append('file', file);
    if (farmId) fd.append('farm_id', String(farmId));
    if (docType) fd.append('doc_type', docType);
    return this.http.post(`${this.baseUrl}/farm/upload`, fd);
  }
}
