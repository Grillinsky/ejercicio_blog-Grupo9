const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const commentController = require("../controllers/commentController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);
router.get("/crear", ensureAuthenticated, articleController.create);
router.post("/crear", ensureAuthenticated, articleController.store);
router.post("/:id", ensureAuthenticated, commentController.store);
router.get("/:id", articleController.show);
router.get("/:id/editar", ensureAuthenticated, articleController.edit);
router.patch("/:id", ensureAuthenticated, articleController.update);
router.delete("/:id/eliminar", ensureAuthenticated, articleController.destroy);

module.exports = router;
