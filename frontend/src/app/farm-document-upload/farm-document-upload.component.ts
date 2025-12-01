import { Component } from '@angular/core';
import { OcrService } from '../services/ocr.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-farm-document-upload',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './farm-document-upload.component.html',
  styleUrls: ['./farm-document-upload.component.css']
})
export class FarmDocumentUploadComponent {

  selectedFile: File | null = null;
  preview: any = null;

  farmId: number | null = null;
  docType: string = '';
  ocrText = '';
  hash = '';
  loading = false;

  constructor(private ocr: OcrService) {}

  onSelect(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = ev => this.preview = ev.target?.result;
    reader.readAsDataURL(file);
  }

  upload() {
    if (!this.selectedFile) {
      alert("Chưa chọn file!");
      return;
    }

    this.loading = true;

    this.ocr.uploadFarm(this.selectedFile, this.farmId ?? undefined, this.docType)
      .subscribe((res: any) => {
        this.ocrText = res.ocrText;
        this.hash = res.hash;
        this.loading = false;
      }, err => {
        alert("Upload OCR lỗi");
        this.loading = false;
      });
  }
}
