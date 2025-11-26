import { Injectable } from "@angular/core";
import { ApiService, ENDPOINTS } from "./api.service";
import { IPaginated, IResponse, LabTest, LabTestQuery } from "../../core/types";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LabTestService {
  constructor(private apiService: ApiService) { }

  // TODO:
  // create() { }

  getByBatchId(batchId: string | number): Observable<IResponse<LabTest[]>> {
    return this.apiService.get<IResponse<LabTest[]>>(ENDPOINTS.LAB_TEST.BY_BATCH_ID(batchId));
  }

  search(query: LabTestQuery): Observable<IPaginated<LabTest>> {
    return this.apiService.post<IPaginated<LabTest>>(ENDPOINTS.LAB_TEST.SEARCH, query)
  }
}
