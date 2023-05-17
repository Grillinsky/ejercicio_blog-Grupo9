async function makeUserAvailableInViews(req, res, next) {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.roles = { 1: "Lector", 2: "Escritor", 3: "Moderador", 4: "Administrador" };
  next();
}

module.exports = makeUserAvailableInViews;
