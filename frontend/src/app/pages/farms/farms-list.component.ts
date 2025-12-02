import { Component, inject, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FarmService } from '../../services/farm.service';
import { Farm, FarmQuery } from '../../../core/types';

@Component({
  selector: 'app-farms-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, FormsModule],
  templateUrl: './farms-list.component.html',
  styleUrls: ['./farms-list.component.css'],
})
export class FarmsListComponent implements OnInit {
  
  searchTerm: string = '';
  farms: Farm[] = [];
  isLoading: boolean;
  openDropdownId: any = null;
  isFilterVisible = false;
  filter = { name: '', owner: '', province: '', status: '' };

  // ===== PAGINATION =====
  pageIndex = 1;
  pageSize = 20;
  total = 0;
  totalPages = 1;
  pages: number[] = [];

  constructor(
    private farmService: FarmService,
    private router: Router
  ) {
    this.isLoading = true;
  }

  ngOnInit() { 
    this.loadFarms(); 
  }

  toggleFilter() { 
    this.isFilterVisible = !this.isFilterVisible; 
  }

  loadFarms() {
    const query: FarmQuery = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      filter: this.searchTerm,
      farmName: this.isFilterVisible ? this.filter.name : '',
      address: this.isFilterVisible ? this.filter.province : '',
      sortColumn: 'created_at',
      sortAscending: false
    };

    this.farmService.search(query).subscribe({
      next: (res) => { 
        this.farms = res.data || []; 
        
        // === LẤY DỮ LIỆU PHÂN TRANG TỪ BACKEND ===
        this.pageIndex = res.pagination.pageIndex;
        this.pageSize = res.pagination.pageSize;
        this.total = res.pagination.total;
        this.totalPages = res.pagination.totalPages;

        // Tạo danh sách các trang
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      }
    });
  }

  goToPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.pageIndex = p;
    this.loadFarms();
  }

  onSearch() { 
    this.pageIndex = 1;  // RESET VỀ TRANG 1
    this.loadFarms(); 
  }

  resetFilter() {
    this.filter = { name: '', owner: '', province: '', status: '' };
    this.searchTerm = '';
    this.pageIndex = 1;  // RESET VỀ TRANG 1
    this.loadFarms();
  }

  editFarm(id: any) {
    this.router.navigate(['/farms/edit', id]);
  }

  deleteFarm(id: any) {
    if (confirm('Bạn có chắc chắn muốn xóa nông trại này?')) {
      this.farmService.delete(id).subscribe({
        next: () => {
          alert('Đã xóa thành công!');
          this.loadFarms();
          this.openDropdownId = null;
        },
        error: (err) => alert('Lỗi xóa: ' + err.error?.error)
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
