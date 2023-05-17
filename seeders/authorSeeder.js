const { faker } = require("@faker-js/faker");
const { Author } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const authors = [];

  for (let i = 0; i < 30; i++) {
    authors.push({
      authorFirstname: faker.name.firstName(),
      authorLastname: faker.name.lastName(),
      authorEmail: faker.internet.email(),
      password: await bcrypt.hash("1234", 5),
      roleId: Math.floor(Math.random() * 4 + 1),
    });
  }

  await Author.bulkCreate(authors);
  console.log("[Database] Se corrió el seeder de Authors.");
};
