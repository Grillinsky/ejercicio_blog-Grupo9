function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo;
    res.redirect("/login");
  }
}

// function requireRole(role) {
//   return (req, res, next) => {
//     if (req.user && req.user.role === role) {
//       return next();
//     } else {
//       return res.status(401).send("Unauthorized");
//     }
//   };
// }
function atLeastReader(req, res, next) {
  if (req.user.role.code >= 100) {
    return next();
  } else {
    return res.redirect("/");
  }
}
function atLeastWriter(req, res, next) {
  if (req.user.role.code >= 200) {
    return next();
  } else {
    return res.redirect("/");
  }
}
function atLeastMod(req, res, next) {
  if (req.user.role.code >= 300) {
    return next();
  } else {
    return res.redirect("/");
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role.code >= 400) {
    return next();
  } else {
    return res.redirect("/");
  }
}

module.exports = { ensureAuthenticated, requireAdmin, atLeastMod, atLeastReader, atLeastWriter };
