const { Article, Comment, Author } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");
const formidable = require("formidable");

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
  let authorId;
  const existingAuthor = await Author.findOne({ where: { authorEmail: req.body.email } });
  if (existingAuthor) {
    authorId = existingAuthor.dataValues.id;
  } else {
    await Author.create({
      authorFirstname: req.body.firstName,
      authorLastname: req.body.lastName,
      authorEmail: req.body.email,
    });
    const newAuthorId = await Author.findOne({ where: { authorEmail: req.body.email } });
    authorId = newAuthorId.dataValues.id;
  }

  await Article.create({
    title: req.body.title,
    content: req.body.content,
    image: "/img/image-dummy.png",
    authorId: authorId,
  });

  return res.redirect(`/admin`);
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id, { include: [Author, Comment] });
  res.render("editArticle", { article });
}

// Update the specified resource in storage.
async function update(req, res) {
  const input = req.body;
  const updateArticle = new Article.update(
    {
      title: input.title,
      content: input.contentInput,
    },
    {
      where: { id: articleId },
    },
  );

  const updateUser = await User.update(
    {
      firstname: input.nameInput,
      lastname: input.lastNameInput,
      email: input.emailInput,
    },
    {
      where: { userId: article.userId },
    },
  );

  console.log();
  res.redirect("/");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Article.destroy({
    where: {
      id: req.params.id,
    },
  });

  console.log("Eliminé este venom");
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
