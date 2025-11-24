import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { LangService, LangCode } from '../../services/language.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  
  // FIX: Thêm các thuộc tính còn thiếu
  isLoading = false;
  errorMessage = '';
  step: 'register' | 'verify' = 'register'; // Quản lý trạng thái màn hình
  verificationCode = ''; // Lưu mã OTP người dùng nhập

  currentLang: LangCode;

  constructor(
    public langService: LangService, 
    private router: Router,
    private authService: AuthService
  ) {
    this.currentLang = this.langService.getLanguage();
  }

  setLang(lang: string) {
    this.langService.setLanguage(lang as LangCode);
    this.currentLang = lang as LangCode;
  }

  register() {
    // 1. Validate cơ bản
    if (!this.fullName || !this.email || !this.password) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Mật khẩu xác nhận không khớp.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // 2. Chuẩn bị dữ liệu
    const payload = {
      username: this.email,
      email: this.email,
      full_name: this.fullName,
      password: this.password,
      role: 'user', 
    };

    // 3. Gọi API Đăng ký
    this.authService.register(payload).subscribe({
      next: () => {
        this.isLoading = false;
        // Chuyển sang màn hình nhập mã (step = 'verify')
        // Đây là logic để HTML hiển thị phần nhập mã OTP
        if(confirm('Đăng ký thành công! Mã xác thực đã được gửi đến email. Nhập mã ngay?')) {
           this.router.navigate(['/verify'], { queryParams: { email: this.email } });
        } else {
           this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'Đăng ký thất bại. Vui lòng thử lại.';
      }
    });
  }

  // FIX: Thêm hàm verify() để xử lý nút "Xác nhận" trong HTML (nếu bạn dùng logic verify tại chỗ)
  // Tuy nhiên, theo luồng mới nhất, chúng ta đang chuyển sang trang /verify riêng biệt.
  // Nếu bạn muốn giữ logic verify ngay tại trang Register (không chuyển trang), dùng hàm này:
  verify() {
    if (!this.verificationCode) return;
    
    this.isLoading = true;
    this.authService.verifyCode(this.email, this.verificationCode).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Xác thực thành công! Bạn có thể đăng nhập ngay.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'Mã xác thực không đúng.';
      }
    });
  }
}