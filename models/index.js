const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
  },
);

const Comment = require("./Comment");
const Article = require("./Article");
const Author = require("./Author");
const Role = require("./Role");

Comment.initModel(sequelize);
Article.initModel(sequelize);
Author.initModel(sequelize);
Role.initModel(sequelize);

Article.belongsTo(Author);
Article.hasMany(Comment);
Comment.belongsTo(Article);
Author.belongsTo(Role);
Role.hasMany(Author);
/**
 * Luego de definir los modelos, se pueden establecer relaciones entre los
 * mismos (usando métodos como belongsTo, hasMany y belongsToMany)...
 */

module.exports = {
  sequelize,
  Comment,
  Article,
  Author,
  Role,
};
