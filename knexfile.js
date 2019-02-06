// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./backend.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./seeds/country.js"
    }
  },
  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // },

  production: {
    client: "postgresql",
    connection: {
      database: "postgres://gojviwbtfjrkyj:f2e48102dcf87c58c19f1eb9c5c88f164051e1d1cfc6eca040dd6719f86387cf@ec2-107-20-183-142.compute-1.amazonaws.com:5432/delcf7086shesf",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./seeds/country.js"
    }
  }
};
