import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FarmService } from '../../services/farm.service';

@Component({
  selector: 'app-farms-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, FormsModule],
  templateUrl: './farms-list.component.html',
  styleUrls: ['./farms-list.component.css'],
})
export class FarmsListComponent implements OnInit {
  farms: any[] = [];
  openDropdownId: any = null;
  searchTerm = '';
  
  // Biến cho bộ lọc nâng cao
  isFilterVisible = false;
  filter = { name: '', owner: '', province: '', status: '' };

  constructor(
    private farmService: FarmService,
    private router: Router 
  ) {}

  ngOnInit() { 
    this.loadFarms(); 
  }

  toggleFilter() { 
    this.isFilterVisible = !this.isFilterVisible; 
  }

  loadFarms() {
    const query = {
      pageIndex: 1, pageSize: 20,
      filter: this.searchTerm,
      farmName: this.isFilterVisible ? this.filter.name : '',
      owner: this.isFilterVisible ? this.filter.owner : '',
      province: this.isFilterVisible ? this.filter.province : '',
      sortColumn: 'created_at', sortAscending: false
    };
    
    // Gọi đúng tên hàm trong service là 'searchFarms' (không phải 'search')
    this.farmService.searchFarms(query).subscribe({
      next: (res: any) => { this.farms = res.data || []; },
      error: (err: any) => console.error('Lỗi tải danh sách:', err)
    });
  }

  onSearch() { this.loadFarms(); }
  
  resetFilter() {
    this.filter = { name: '', owner: '', province: '', status: '' };
    this.searchTerm = '';
    this.loadFarms();
  }

  editFarm(id: any) {
    this.router.navigate(['/farms/edit', id]);
  }

  deleteFarm(id: any) {
    if (confirm('Bạn có chắc chắn muốn xóa nông trại này?')) {
      this.farmService.deleteFarm(id).subscribe({
        next: () => {
          alert('Đã xóa thành công!');
          this.loadFarms();
          this.openDropdownId = null;
        },
        error: (err: any) => alert('Lỗi xóa: ' + err.error?.error)
      });
    }
  }

  toggleMenu(id: any, event: Event) {
    event.stopPropagation();
    this.openDropdownId = this.openDropdownId === id ? null : id;
  }

  @HostListener('document:click')
  closeMenu() { 
    this.openDropdownId = null; 
  }
}