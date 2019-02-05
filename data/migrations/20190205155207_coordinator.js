exports.up = function(knex, Promise) {
  return knex.schema.createTable("coordinator", tbl => {
    tbl.increments();

    tbl
      .string("username", 255)
      .notNullable()
      .unique();

    tbl.string("password", 255).notNullable();

    tbl.string("name", 255).notNullable();

    tbl.string("email", 255).notNullable();

    tbl.string("job-title", 255).notNullable();

    tbl.string("country_name", 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("coordinator");
};
