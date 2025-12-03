import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangService, LangCode } from '../../services/language.service';

@Component({
  selector: 'app-farm-document-upload',
  standalone: true,
  templateUrl: './farm-document-upload.component.html',
  styleUrls: ['./farm-document-upload.component.css'],
  imports: [CommonModule, FormsModule, TranslateModule]
})
export class FarmDocumentUploadComponent {
  farmId = 0;
  docType = '';
  file: File | null = null;
  loading = false;
  history: any[] = [];

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

  uploadFarmDoc() {
    if (!this.file) return;
    this.loading = true;

    setTimeout(() => {
      this.loading = false;

      this.history.push({
        farmId: this.farmId,
        docType: this.docType,
        fileName: this.file!.name,
        date: new Date().toISOString()
      });
    }, 1000);
  }
}
