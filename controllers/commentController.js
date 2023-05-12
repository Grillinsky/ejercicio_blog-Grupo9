const { Comment } = require("../models");
const { faker } = require("@faker-js/faker");

async function store(req, res) {
  // if (!req.body.userName) {
  //   console.log("No hay Autor");
  //   res.redirect("back");
  // } else if (!req.body.Comment) {
  //   console.log("No hay comentario");
  //   res.redirect("back");
  // }
  await Comment.create(
    {
      userName: req.body.userName,
      userComment: req.body.userComment,
      articleId: req.params.id,
    },
    () => {
      console.log("Comment created");
    },
  );
  return res.redirect(`/articulos/${req.params.id}`);
}

module.exports = { store };
