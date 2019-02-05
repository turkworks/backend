exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("country")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("country").insert([
        { name: "USA" },
        { name: "China" },
        { name: "Japan" },
        { name: "Georgia" },
        { name: "Germany" },
        { name: "France" },
        { name: "Russia" },
        { name: "Italy" },
        { name: "Brazil" },
        { name: "India" },
        { name: "Canada" },
        { name: "Mexico" },
        { name: "Australia" },
        { name: "Spain" },
        { name: "Egypt" }
      ]);
    });
};
