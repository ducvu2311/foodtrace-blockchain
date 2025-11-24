import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core'; // Nếu muốn đa ngôn ngữ
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  email = '';
  code = '';
  isLoading = false;
  errorMessage = '';
  isSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Tự động lấy email từ URL (ví dụ: /verify?email=abc@gmail.com)
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = params['email'];
      }
    });
  }

  submit() {
    if (!this.email || !this.code) {
      this.errorMessage = 'Vui lòng nhập email và mã xác thực.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.verifyCode(this.email, this.code).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSuccess = true;
        
        // Chuyển hướng về trang Login sau 2 giây
        setTimeout(() => {
          this.router.navigate(['/login'], { queryParams: { email: this.email } });
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        // Lấy lỗi từ backend trả về
        this.errorMessage = err.error?.error || 'Mã xác thực không hợp lệ hoặc đã hết hạn.';
      }
    });
  }
}