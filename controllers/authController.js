const { passport } = require("../config/passport");

function login(req, res) {
  console.log("Entro a login");
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/",
  })(req, res);
}

//ver formulario de login
async function show(req, res) {
  res.render("login");
}

//Log Ou
function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      // Manejar el error, si es necesario
      console.error(err);
    }
    res.redirect("/");
  });
}

module.exports = { login, show, logout };
