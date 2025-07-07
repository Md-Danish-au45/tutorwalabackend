const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  category: String,
  title: { type: String, required: true },
  content: { type: String, required: true },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  slug: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Article", ArticleSchema);
