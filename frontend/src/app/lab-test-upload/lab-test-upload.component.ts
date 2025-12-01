import { Component } from '@angular/core';
import { OcrService } from '../services/ocr.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-lab-test-upload',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './lab-test-upload.component.html',
  styleUrls: ['./lab-test-upload.component.css']
})
export class LabTestUploadComponent {
  selectedFile: File | null = null;
  preview: any = null;

  batchId: number | null = null;
  ocrText = '';
  hash = '';
  loading = false;

  constructor(private ocr: OcrService) {}

  onSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = e => this.preview = e.target?.result;
    reader.readAsDataURL(file);
  }

  upload() {
    if (!this.selectedFile) {
      alert("Vui lòng chọn file");
      return;
    }

    this.loading = true;

    this.ocr.uploadLab(this.selectedFile, this.batchId ?? undefined)
      .subscribe((res: any) => {
        this.ocrText = res.ocrText;
        this.hash = res.hash;
        this.loading = false;
      }, err => {
        alert("Lỗi khi OCR");
        this.loading = false;
      });
  }
}
