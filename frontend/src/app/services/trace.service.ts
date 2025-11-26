import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TraceService {
  private apiUrl = `${environment.apiUrl}/api/trace`;

  constructor(private http: HttpClient) {}

  traceFullInfo(batchCode: string): Observable<any> {
    // Mock Data Demo
    if (batchCode === 'LOT-2025-001') {
      return of({
        batch: { batch_number: 'LOT-2025-001', production_date: '2025-11-20' },
        product: { name: 'Dâu Tây Giống Nhật (Hữu Cơ)', description: 'VietGAP Standard' },
        farm: { farm_name: 'Nông Trại Rau Sạch Đà Lạt' },
        blockchain: { verified: true, blockchain_tx: '0x8f9a...', onChainTime: '1732180000' }
      });
    }

    // Gọi API 1: Thông tin cơ bản
    const basic$ = this.http.get<any>(`${this.apiUrl}/${batchCode}`).pipe(
      catchError(() => of({ error: true }))
    );
    
    // Gọi API 2: Thông tin chi tiết
    const details$ = this.http.get<any>(`${this.apiUrl}/${batchCode}/details`).pipe(
      catchError(() => of({ error: true }))
    );

    // Gộp 2 API
    return forkJoin([basic$, details$]).pipe(
      map((results: any[]) => {
        const basicRes = results[0];
        const detailRes = results[1];

        if (basicRes.error && detailRes.error) {
          throw new Error('Không tìm thấy dữ liệu.');
        }
        
        const bData = basicRes.success ? basicRes.data : {};
        const dData = detailRes.success ? detailRes.data : {};
        
        return { ...bData, ...dData };
      })
    );
  }
}