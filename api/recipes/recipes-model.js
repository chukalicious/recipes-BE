const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = { findAll, findByID, findByUserID, insert, update, remove };

function findAll() {
  return db("recipes").orderBy("id");
}

function findByID(id) {
  return db("recipes").where({ id }).first();
}

function findByUserID(created_by) {
  return db("recipes").where({ created_by });
}

async function insert(recipe) {
  const [newRecipe] = await db("recipes").insert(recipe, "*");
  return findByUserID(newRecipe.created_by);
}

async function update(id, change) {
  const [updated] = await db("recipes").where({ id }).update(change, "*");
  return findByUserID(updated.created_by);
}

async function remove(id) {
  const [deleted] = await db("recipes").where({ id }).del("*");
  return deleted;
}
