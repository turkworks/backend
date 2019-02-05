exports.up = function(knex, Promise) {
  return knex.schema.createTable("coordinator_stories", tbl => {
    tbl.increments();

    tbl
      .integer("coordinator_id")
      .unsigned()
      .references("id")
      .inTable("coordinator");

    tbl
      .integer("story_id")
      .unsigned()
      .references("id")
      .inTable("stories");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("coordinator_stories");
};
