const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const pagesController = require("../controllers/pagesController");

router.get("/login", authController.show);
router.post("/login", authController.login);
router.get("/logOut", authController.logout);

router.get("/", pagesController.index);

module.exports = router;
