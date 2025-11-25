import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BatchService } from '../../services/batch.service';

@Component({
  selector: 'app-batch-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.css']
})
export class BatchDetailComponent implements OnInit {
  batchId!: string;
  
  // FIX: Khai báo biến batch để HTML sử dụng
  batch: any = { 
    code: '', 
    productName: '', 
    farmName: '', 
    status: '', 
    quantity: 0, 
    unit: '', 
    harvestedAt: '', 
    producedAt: '', 
    facilityName: '' 
  };
  
  constructor(
    private route: ActivatedRoute, 
    private location: Location,
    private batchService: BatchService
  ) {
    this.batchId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.batchService.getBatchById(this.batchId).subscribe({
      next: (res: any) => {
        if (res.data) {
          const d = res.data;
          this.batch = {
            code: d.batch_number,
            productName: d.product_name || 'Sản phẩm',
            farmName: d.farm_name || 'Nông trại',
            status: d.expiry_date ? 'Active' : 'Expired',
            quantity: 1000,
            unit: 'kg',
            harvestedAt: d.production_date,
            producedAt: d.created_at,
            facilityName: 'Nhà máy'
          };
        }
      },
      error: (err: any) => console.error('Lỗi lấy chi tiết:', err)
    });
  }

  // FIX: Thêm hàm goBack
  goBack() {
    this.location.back();
  }
}