const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = {
  get,
  findByID,
  //   findBy,
  add,
  //   remove,
  //   update,
};

function get() {
  return db("users");
}

function findByID(id) {
  return db("users").where({ id }).first();
}

async function add(user) {
  //   return db("users")
  //     .insert(user)
  //     .into("users")
  //     .then((user) => {
  //       return user;
  //     });

  const [id] = await db("users").insert(user, "id");
  return findByID(id);
}
