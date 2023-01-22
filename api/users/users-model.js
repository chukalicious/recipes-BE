const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = {
  get,
  //   getByID,
  //   findBy,
  //   add,
  //   remove,
  //   update,
};

function get() {
  return db("users");
}
