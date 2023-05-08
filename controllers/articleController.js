const { Article, Comment, Author } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");

// Display a listing of the resource.

async function index(req, res) {
  const articles = await Article.findAll({
    include: [Author, Comment],
    sort: ["createdAt", "DESC"],
  });

  articles.forEach((article) => {
    article.dataValues.createdAt = format(article.dataValues.createdAt, "dd 'de' MMMM','  yyyy", {
      locale: es,
    });
  });
  return res.render("home", { articles });
}

// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, { include: [Author, Comment] });

  article.dataValues.createdAt = format(article.dataValues.createdAt, "dd 'de' MMMM','  yyyy", {
    locale: es,
  });

  return res.render("article", { article });
  // res.json(article)
}

// Show the form for creating a new resource
async function create(req, res) {
  return res.render("createArticle");
}

// Store a newly created resource in storage.
async function store(req, res) {
  await Article.Create({
    title: req.body.title,
    content: req.body.content,
    authorId: 88,
  });
  res.redirect(`/:${id}`);
}

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
