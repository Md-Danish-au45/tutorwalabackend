const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const {
  getArticleBySlug,
  getAllArticles,
  deleteArticle,
  updateArticle,
  createArticle,
} = require("../controller/articleController");

// Create with image
router.post("/blog", upload.single("image"), createArticle);

// Update with optional image
router.put("/blog/:slug", upload.single("image"), updateArticle);

// Delete by slug
router.delete("/blog/:slug", deleteArticle);

// Get
router.get("/blog", getAllArticles);
router.get("/blog/:slug", getArticleBySlug);

module.exports = router;
