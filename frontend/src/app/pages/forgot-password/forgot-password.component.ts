import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { LangService, LangCode } from '../../services/language.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  // Dữ liệu form
  email = '';
  otpCode = '';
  newPassword = '';
  confirmPassword = '';

  // Trạng thái UI
  step = 1; // 1: Nhập email, 2: Nhập OTP & Pass mới
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  currentLang: LangCode;

  constructor(
    private auth: AuthService, 
    private router: Router,
    public langService: LangService
  ) {
    this.currentLang = this.langService.getLanguage();
  }

  setLang(lang: string) {
    this.langService.setLanguage(lang as LangCode);
    this.currentLang = lang as LangCode;
  }

  // BƯỚC 1: Gửi yêu cầu lấy mã
  sendCode() {
    if (!this.email) {
      this.errorMessage = 'Vui lòng nhập email.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    this.auth.forgotPassword(this.email).subscribe({
      next: () => {
        this.isLoading = false;
        this.step = 2; // Chuyển sang bước 2
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'Không tìm thấy email hoặc lỗi hệ thống.';
      },
    });
  }

  // BƯỚC 2: Đổi mật khẩu
  resetPassword() {
    if (!this.otpCode || !this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Mật khẩu xác nhận không khớp.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const payload = {
      email: this.email,
      code: this.otpCode,
      newPassword: this.newPassword
    };

    this.auth.resetPassword(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'SUCCESS'; // Hiện thông báo thành công
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'Mã xác thực sai hoặc hết hạn.';
      },
    });
  }
}