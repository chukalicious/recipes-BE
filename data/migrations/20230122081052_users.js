exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments("id");
    tbl.string("email").notNullable().unique();
    tbl.string("username").unique();
    tbl.string("password", 256).notNullable();
    tbl.text("avatar");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
