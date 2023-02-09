const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = {
  getAll,
  findByID,
  add,
  remove,
  update,
  findBy,
};

function getAll() {
  return db("users").orderBy("id");
}

function findByID(id) {
  return db("users").where({ id }).first();
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return findByID(id);
}

function remove(id) {
  return db("users").where({ id }).del();
}

function update(id, changes) {
  return db("users").where({ id }).update(changes, "*");
}

function findBy(filter) {
  return db("users").where(filter);
}
