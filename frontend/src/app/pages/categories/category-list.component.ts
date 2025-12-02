import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, RouterModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  searchTerm = '';
  openDropdownId: any = null;
  
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(res => {
      const data = res.data || [];
      if (this.searchTerm) {
        this.categories = data.filter((c: any) =>
          c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.categories = data;
      }
    });
  }

  onSearch() {
    this.loadCategories();
  }

  editCategory(id: any) {
    this.router.navigate(['/categories/edit', id]);
  }

  deleteCategory(id: any) {
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      this.categoryService.delete(id).subscribe({
        next: () => {
          alert('Đã xóa thành công!');
          this.loadCategories();
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
