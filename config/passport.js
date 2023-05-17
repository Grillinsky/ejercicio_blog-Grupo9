const passport = require("passport");
const LocalStrategy = require("passport-local");
const { Author, Role } = require("../models");
const bcrypt = require("bcryptjs");

function passportConfig() {
  passport.use(
    new LocalStrategy({ usernameField: "authorEmail" }, async function (email, password, done) {
      try {
        const user = await Author.findOne({ where: { authorEmail: email } });
        if (!user) {
          console.log("El usuario no existe");
          return done(null, false, { message: "Credenciales incorrectas" });
        }
        const checkPasswords = await bcrypt.compare(password, user.password);
        if (!checkPasswords) {
          console.log("La contraseña es incorrecta");
          return done(null, false, { message: "Credenciales Incorrectas" });
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    }),
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await Author.findByPk(id, { include: "role" });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = { passportConfig, passport };
