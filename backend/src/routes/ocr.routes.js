const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ocrController = require('../controllers/ocrController');

// Lưu file vào thư mục uploads/ocr
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/ocr'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// ---------- FARM DOCUMENT ----------
router.post(
  '/farm-document',
  upload.single('file'),
  ocrController.ocrFarmDocument
);

router.get(
  '/farm-document/history',
  ocrController.getFarmDocumentHistory
);

// ---------- LAB TEST ----------
router.post(
  '/lab-test',
  upload.single('file'),
  ocrController.ocrLabTest
);

router.get(
  '/lab-test/history',
  ocrController.getLabTestHistory
);

module.exports = router;
