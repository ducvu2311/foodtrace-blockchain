// src/routes/lab_tests.routes.js
const express = require("express");
const labTestController = require("../controllers/lab_tests.controller");
const secure = require("../middleware/auth.secure");
const { upload } = require("../controllers/media.controller");

const router = express
  .Router()
  // --------------------------------------
  // ➕ Tạo kiểm định (admin, manufacturer)
  // --------------------------------------
  .post(
    "/",
    secure(["admin", "manufacturer"]),
    upload.array("files", 4),
    labTestController.createLabTest,
  )
  // --------------------------------------
  // 🔍 Search kiểm định (QueryModel)
  // POST /lab-tests/search
  // --------------------------------------
  .post(
    "/search",
    secure(["admin", "manufacturer"]),
    labTestController.searchLabTests,
  )
  // --------------------------------------
  // 📄 Lấy kiểm định theo batch
  // GET /lab-tests/batch/:batch_id
  // --------------------------------------
  .get(
    "/batch/:batch_id",
    secure(["admin", "manufacturer"]),
    labTestController.getTestsByBatch,
  );

module.exports = router;
