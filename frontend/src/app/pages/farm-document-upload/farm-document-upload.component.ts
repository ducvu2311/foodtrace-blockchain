import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-farm-document-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './farm-document-upload.component.html',
  styleUrls: ['./farm-document-upload.component.css']
})
export class FarmDocumentUploadComponent {

  farmId: number = 0;
  docType: string = '';
  file: File | null = null;
  uploading: boolean = false;

  history: {
    farmId: number;
    docType: string;
    date: string;
    hash: string;
  }[] = [];

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  uploadFarmDocument() {
    if (!this.file || !this.docType || !this.farmId) return;
    this.uploading = true;

    setTimeout(() => {
      this.history.push({
        farmId: this.farmId,
        docType: this.docType,
        date: new Date().toLocaleString(),
        hash: Math.random().toString(16).substring(2, 10)
      });

      this.uploading = false;
      this.file = null;
      this.docType = '';
    }, 1200);
  }
}
