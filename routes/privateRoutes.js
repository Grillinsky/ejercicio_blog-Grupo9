const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");

// Rutas relacionadas al panel de control (Admin):
// ...

router.get("/welcome", ensureAuthenticated, function (req, res) {
  console.log(req.user.firstname);
  return res.redirect("/admin");
});

router.get("/", ensureAuthenticated, pagesController.showAdmin);

router.get("/logOut", authController.logout);

module.exports = router;
