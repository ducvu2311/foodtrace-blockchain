const express = require("express");
const traceController = require("../controllers/trace.controller");

const router = express
  .Router()
  // 🧾 Tóm tắt cơ bản (dành cho quét QR)
  .get("/:batch_number", traceController.traceByBatchNumber)
  // 🔍 Chi tiết mở rộng (nếu người dùng ấn "Xem thêm")
  .get("/:batch_number/details", traceController.getTraceDetails);

module.exports = router;
