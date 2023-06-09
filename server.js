require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");

const routes = require("./routes");
const { passport, passportConfig } = require("./config/passport");
const makeUserAvailableInViews = require("./middlewares/makeUserAvailableInViews");

const APP_PORT = process.env.APP_PORT;
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());
app.use(makeUserAvailableInViews);

passportConfig();

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
