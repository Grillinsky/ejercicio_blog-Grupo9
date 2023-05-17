const { Comment } = require("../models");
const { faker } = require("@faker-js/faker");

async function store(req, res) {
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
