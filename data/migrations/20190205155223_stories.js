exports.up = function(knex, Promise) {
  return knex.schema.createTable("stories", tbl => {
    tbl.increments();

    tbl.string("title", 255).notNullable();

    tbl.string("story_country", 255).notNullable();

    tbl.string("description", 255).notNullable();

    tbl.date("date");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("stories");
};
