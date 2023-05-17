const { Author } = require("../models");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const passportConfig = require("../config/passport");

//ver formulario de creacion
async function create(req, res) {
  res.render("register");
}

//guardar un nuevo usuario
async function store(req, res) {
  let newAuthor;
  if (req.body.password === req.body.confPassword) {
    newAuthor = await Author.create({
      authorFirstname: req.body.firstName,
      authorLastname: req.body.lastName,
      authorEmail: req.body.email,
      roleId: 1,
      password: await bcrypt.hash(req.body.password, 3),
    });
  }
  if (newAuthor) {
    req.login(newAuthor, () => res.redirect("/"));
    console.log(req.user);
  } else {
    res.redirect("back");
  }
}
async function destroy(req, res) {
  await Article.destroy({
    where: {
      userID: req.params.id,
    },
  });
  await Author.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect("back");
}

module.exports = {
  create,
  store,
  destroy,
};
