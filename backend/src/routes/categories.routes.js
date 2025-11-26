// src/routes/categories.routes.js
const express = require("express");
const categoryController = require("../controllers/category.controller");
const secure = require("../middleware/auth.secure");

const router = express
  .Router()
  // --------------------------------------
  // 🔍 Search categories (C# style)
  // POST /categories/search
  // --------------------------------------
  .post("/search", secure(["admin"]), categoryController.searchCategories)
  // --------------------------------------
  // ➕ Tạo category
  // --------------------------------------
  .post("/", secure(["admin"]), categoryController.createCategory)
  // --------------------------------------
  // ♻ Cập nhật category
  // --------------------------------------
  .put("/:id", secure(["admin"]), categoryController.updateCategory)
  // --------------------------------------
  // 🗑 Xóa category
  // --------------------------------------
  .delete("/:id", secure(["admin"]), categoryController.deleteCategory)
  .get("/", secure(["admin"]), categoryController.getAllCategories);
module.exports = router;
