const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = { findAll, findByID, insert, update, remove };

function findAll() {
  return db("recipes");
}

function findByID(id) {
  return db("recipes").where({ id }).first();
}

async function insert(recipe) {
  const [newRecipe] = await db("recipes").insert(recipe, "*");
  return findByID(newRecipe.id);
}

async function update(id, change) {
  const [updated] = await db("recipes").where({ id }).update(change, "*");
  return findByID(updated.id);
}

async function remove(id) {
  const [deleted] = await db("recipes").where({ id }).del("*");
  return deleted;
}
