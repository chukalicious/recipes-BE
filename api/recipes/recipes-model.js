const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = { findAll, findByID, insert };

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
