const { Article, Comment } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const article = await Article.findAll({ include: ["author", "comment"] });
  res.json(article);
}

// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, { include: "author" });
  const comments = await Comment.findAll({ where: { articleId: req.params.id } });
  res.json({ article, comments });
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};