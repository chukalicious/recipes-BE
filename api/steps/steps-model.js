const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = { findAll, findByID, findByRecipeID, insert, update, remove };

function findAll() {
  return db("steps");
}

function findByID(id) {
  return db("steps").where({ id }).first();
}

function findByRecipeID(recipe_id) {
  return db("steps").where({ recipe_id });
}

async function insert(step) {
  const [newStep] = await db("steps").insert(step, "*");
  return findByID(newStep.id);
}

async function update(id, step) {
  const [updated] = await db("steps").where({ id }).update(step, "*");
  return findByRecipeID(updated.recipe_id);
}

async function remove(id) {
  const [deleted] = await db("steps").where({ id }).del("*");
  return deleted;
}
