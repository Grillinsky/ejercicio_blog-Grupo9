const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  requireAdmin,
  atLeastMod,
  atLeastWriter,
} = require("../middlewares/ensureAuthenticated");
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

// Rutas relacionadas al panel de control (Admin):
// ...

router.get("/welcome", ensureAuthenticated, function (req, res) {
  console.log(req.user.firstname);
  return res.redirect("/admin");
});
router.use(ensureAuthenticated);
// router.get("/welcome", ensureAuthenticated, requireAdmin, function (req, res) {
//   console.log(req.user.firstname);
//   return res.redirect("/userAdmin");
// });

router.get("/", atLeastWriter, pagesController.showAdmin);

router.get("/authors/:id/edit");

router.delete("/authors/:id", userController.destroy);

router.get("/userAdmin", requireAdmin, pagesController.showAuthorAdmin);

module.exports = router;
