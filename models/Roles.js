const { Model, DataTypes } = require("sequelize");
const sequelize = require(".");

const ROLES = {
  READER: "reader",
  WRITER: "writer",
  MOD: "moderator",
  ADMIN: "admin",
};

class Role extends Model {
  static initModel(sequelize) {
    Role.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isIn: [Object.values(ROLES)],
          },
        },
      },
      {
        sequelize,
        modelName: "Role",
      },
    );
    return Role;
  }
}

module.exports = { Role, ROLES };
