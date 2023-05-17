const { Article, Comment, Author } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");

// Display a listing of the resource.

async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, { include: [Author, Comment] });

  article.createdAt = format(article.createdAt, "dd 'de' MMMM','  yyyy", {
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
  console.log(req.user.authorEmail);
  const authorId = req.user.id;
  if (!authorId) {
    return res.redirect("/login");
  } else {
    await Article.create({
      title: req.body.title,
      content: req.body.content,
      image: "/img/image-dummy.png",
      authorId: req.user.id,
    });
  }
  console.log("user", req.user.id);
  return res.redirect("/admin");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id, { include: [Author, Comment] });
  res.render("editArticle", { article });
}

// Update the specified resource in storage.
async function update(req, res) {
  const article = req.body;
  const articleId = req.params.id;
  await Article.update(
    {
      title: article.title,
      content: article.content,
    },
    {
      where: { id: articleId },
    },
  );
  res.redirect("/admin");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Article.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.redirect("/admin");
}

// editar un articulo

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
