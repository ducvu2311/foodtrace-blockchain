import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  openDropdownId: any = null;
  searchTerm = '';

  isFilterVisible = false;
  filter = { name: '', category: '', status: '' };

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }
  pageIndex = 1;
  pageSize = 20;
  total = 0;
  totalPages = 1;
  pages: number[] = [];
  
  goToPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.pageIndex = p;
    this.loadProducts();
  }
  
  ngOnInit() {
    this.loadProducts();
  }

  toggleFilter() { this.isFilterVisible = !this.isFilterVisible; }

  loadProducts() {
    const query = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      filter: this.searchTerm,
      name: this.isFilterVisible ? this.filter.name : '',
      // categoryId: ... nếu muốn lọc theo danh mục
      sortColumn: 'created_at',
      sortAscending: false
    };
    this.productService.search(query).subscribe({
      next: (res) => {
        this.products = res.data || [];
                this.pageIndex = res.pagination.pageIndex;
        this.pageSize = res.pagination.pageSize;
        this.total = res.pagination.total;
        this.totalPages = res.pagination.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        console.log(res.data);
      }
    });
  }

  onSearch() {
    this.loadProducts();
  }

  // FIX: Hàm reset bộ lọc
  resetFilter() {
    this.filter = { name: '', category: '', status: '' };
    this.searchTerm = '';
    this.loadProducts();
  }

  editProduct(id: any) {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: any) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          alert('Đã xóa thành công!');
          this.loadProducts();
          this.openDropdownId = null;
        },
        error: (err) => alert('Lỗi xóa: ' + (err.error?.error || 'Lỗi server'))
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
