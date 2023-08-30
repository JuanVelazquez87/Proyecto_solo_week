const Sequelize = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class User extends Sequelize.Model {
  createHash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword = function (password) {
    return this.createHash(password, this.salt).then(
      (passwordHasheado) => passwordHasheado === this.password
    );
  };
}
User.init(
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "user" }
);
User.addHook("beforeCreate", "hashPassword", (user, options) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;
  return user.createHash(user.password, salt).then((passwordHasheado) => {
    user.password = passwordHasheado;
  });
});

module.exports = User;
