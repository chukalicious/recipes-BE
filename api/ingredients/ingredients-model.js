const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = { getAll, insert, findById, findByRecipeID, update };

function getAll() {
  return db("ingredients");
}

function findById(id) {
  return db("ingredients").where({ id }).first();
}

function findByRecipeID(recipe_id) {
  return db("ingredients").where({ recipe_id });
}

async function insert(ingredient) {
  const [newIngredient] = await db("ingredients").insert(ingredient, "*");
  return findByRecipeID(newIngredient.recipe_id);
}

async function update(id, ingredient) {
  const [updated] = await db("ingredients")
    .where({ id })
    .update(ingredient, "*");
  return findByRecipeID(updated.recipe_id);
}
