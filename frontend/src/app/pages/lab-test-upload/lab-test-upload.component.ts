import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangService, LangCode } from '../../services/language.service';

interface LabTestHistory {
  batchId: number;
  testType: string;
  fileName: string;
  date: string;
}

@Component({
  selector: 'app-lab-test-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './lab-test-upload.component.html',
  styleUrls: ['./lab-test-upload.component.css']
})
export class LabTestUploadComponent {
  batchId: number = 0;
  testType: string = '';
  file: File | null = null;
  loading = false;
  history: LabTestHistory[] = [];

  constructor(private router: Router, private translate: TranslateService, private lang: LangService) {}

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  changeLang(lang: LangCode) {
    this.lang.setLanguage(lang);
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  uploadLabTest() {
    if (!this.file) return;
    this.loading = true;

    setTimeout(() => {
      this.loading = false;

      this.history.push({
        batchId: this.batchId,
        testType: this.testType,
        fileName: this.file!.name,
        date: new Date().toISOString()
      });
    }, 1000);
  }
}
