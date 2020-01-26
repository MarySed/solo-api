exports.up = function(knex) {
  return knex.schema.createTable("books", t => {
    t.increments().index();

    t.string("book_name");

    t.string("author_firstname");

    t.string("author_lastname");

    t.string("genre");

    t.text("review"); //using text for larger input

    t.integer("rating");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("books");
};
