import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FarmService } from '../../services/farm.service';

@Component({
  selector: 'app-farm-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './farm-form.component.html',
  styleUrls: ['./farm-form.component.css']
})
export class FarmFormComponent implements OnInit {
  isEditMode = false;
  farmId: any = null;
  isLoading = false;

  farm = { name: '', owner_name: '', address: '', contact_email: '', contact_phone: '', website: '' };

  constructor(
    private farmService: FarmService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.farmId = params['id'];
        this.loadFarmData();
      }
    });
  }

  loadFarmData() {
    this.isLoading = true;
    this.farmService.getFarmById(this.farmId).subscribe({
      next: (res) => {
        if (res.data) this.farm = res.data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onSubmit() {
    if (!this.farm.name || !this.farm.address) {
      alert('Vui lòng nhập tên và địa chỉ');
      return;
    }
    this.isLoading = true;
    const obs = this.isEditMode 
      ? this.farmService.updateFarm(this.farmId, this.farm) 
      : this.farmService.createFarm(this.farm);

    obs.subscribe({
      next: () => { alert('Thành công!'); this.goBack(); },
      error: (err) => { alert('Lỗi: ' + err.error?.error); this.isLoading = false; }
    });
  }

  goBack() { this.location.back(); }
}