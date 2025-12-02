import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-lab-test-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './lab-test-upload.component.html',
  styleUrls: ['./lab-test-upload.component.css']
})
export class LabTestUploadComponent {

  batchId: number = 0;
  testType: string = '';
  file: File | null = null;
  uploading: boolean = false;

  history: {
    batchId: number;
    testType: string;
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

  uploadLabTest() {
    if (!this.file || !this.testType || !this.batchId) return;
    this.uploading = true;

    setTimeout(() => {
      this.history.push({
        batchId: this.batchId,
        testType: this.testType,
        date: new Date().toLocaleString(),
        hash: Math.random().toString(16).substring(2, 10)
      });

      this.uploading = false;
      this.file = null;
      this.testType = '';
    }, 1200);
  }

}
