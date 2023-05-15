const { Role, ROLES } = require("../models/Roles");
// create an array of objects representing the roles you want to add to the database

module.exports = async () => {
  const rolesData = [
    { name: ROLES.READER },
    { name: ROLES.WRITER },
    { name: ROLES.MOD },
    { name: ROLES.ADMIN },
  ]; // use the bulkCreate method to insert the roles into the database
  await Role.bulkCreate(rolesData);
  console.log("Roles created successfully!");
};
