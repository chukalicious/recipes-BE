exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("id");
      tbl.string("email").notNullable().unique();
      tbl.string("username").unique();
      tbl.string("password", 256).notNullable();
      tbl.text("avatar");
    })
    .createTable("recipes", (tbl) => {
      tbl.increments("id");
      tbl.string("recipe_name");
      tbl
        .integer("created_by")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("ingredients", (tbl) => {
      tbl.increments("id");
      tbl.string("ingredient", 256).notNullable();
      tbl.float("quantity", 4, 2);
      tbl.string("unit");
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("ingredients")
    .dropTableIfExists("recipes")
    .dropTableIfExists("users");
};
