const Article = require("../models/Article");
const slugify = require("slugify");

// Create a new article
// exports.createArticle = async (req, res) => {
//   try {
//     const {
//       title,
//       content,
//       category,
//       metaTitle,
//       metaDescription,
//       metaKeywords,
//     } = req.body;

//     const slug = slugify(title, { lower: true, strict: true });

//     const newArticle = new Article({
//       title,
//       content,
//       category,
//       metaTitle,
//       metaDescription,
//       metaKeywords: metaKeywords?.split(",").map((k) => k.trim()),
//       slug,
//     });

//     await newArticle.save();
//     res.status(201).json({ message: "Article created", slug });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error creating article", error: err.message });
//   }
// };

// Get article by slug
exports.getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching article", error: err.message });
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching articles", error: err.message });
  }
};

// CREATE
exports.createArticle = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;
    const slug = slugify(title, { lower: true, strict: true });

    const imagePath = req.file ? req.file.path : null;

    const newArticle = new Article({
      title,
      content,
      category,
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywords?.split(",").map((k) => k.trim()),
      slug,
      image: imagePath,
    });

    await newArticle.save();
    res.status(201).json({ message: "Article created", slug });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating article", error: err.message });
  }
};

// UPDATE
exports.updateArticle = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const updateFields = {
      title,
      content,
      category,
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywords?.split(",").map((k) => k.trim()),
    };

    if (imagePath) updateFields.image = imagePath;
    if (title)
      updateFields.slug = slugify(title, { lower: true, strict: true });

    const updated = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: updateFields },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article updated", article: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating article", error: err.message });
  }
};

// DELETE
exports.deleteArticle = async (req, res) => {
  try {
    const deleted = await Article.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).json({ message: "Article not found" });

    res.json({ message: "Article deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting article", error: err.message });
  }
};

// GET SINGLE & GET ALL (already defined)
