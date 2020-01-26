const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const config = require("../config");
const knex = require("knex")(config.db);

const schema = buildSchema(`
type Books {
  id: String
  book_name: String
  author_firstname: String
  author_lastname: String
  genre: String
  review: String
  rating: Int
}

input InputBooks {
  id: String
  book_name: String
  author_firstname: String
  author_lastname: String
  genre: String
  review: String
  rating: Int
}

type Query {
    Books: [Books]

    BooksByGenre(genre: String): [Books]
    BooksByAuthor(author_name: String): [Books]

    BooksByRating(rating: String): [Books]
    RatingGreaterThan(rating: String): [Books]
    RatingLessThan(rating: String): [Books]
    
}

type Mutation {
  AddBook(input: InputBooks): [Books]
  DeleteBook(id: String): [Books]
  UpdateBook(book_name: String, input: InputBooks): [Books]

  UpdateReview(book_name: String, input: InputBooks): [Books]
  UpdateRating(book_name: String, input: InputBooks): [Books]
}
`);

const root = {
  Books: () => {
    return knex("books")
      .select("books.*")
      .orderBy("id");
  },

  AddBook: request => {
    return knex("books")
      .returning([
        "id",
        "book_name",
        "author_firstname",
        "author_lastname",
        "genre",
        "review",
        "rating"
      ])
      .insert([
        {
          book_name: request.input.book_name,
          author_firstname: request.input.author_firstname,
          author_lastname: request.input.author_lastname,
          genre: request.input.genre,
          review: request.input.review,
          rating: request.input.rating
        }
      ]);
  },

  DeleteBook: request => {
    return knex("books")
      .returning(["books.*"])
      .where({
        id: request.id
      })
      .del();
  },

  BooksByGenre: request => {
    return knex("books")
      .select("books.*")
      .where({
        genre: request.genre
      });
  },

  BooksByAuthor: request => {
    return knex("books")
      .select("books.*")
      .where({
        author_firstname: request.author_name
      })
      .orWhere({
        author_lastname: request.author_name
      });
  },

  BooksByRating: request => {
    return knex("books")
      .select("books.*")
      .where("rating", "=", request.rating);
  },

  RatingGreaterThan: request => {
    return knex("books")
      .select([
        "id",
        "book_name",
        "author_firstname",
        "author_lastname",
        "genre",
        "review",
        "rating"
      ])
      .where("rating", ">", request.rating);
  },

  RatingLessThan: request => {
    return knex("books")
      .select(["books.*"])
      .where("rating", "<", request.rating);
  },

  UpdateBook: request => {
    return knex("books")
      .where({ book_name: request.book_name })
      .update(
        {
          book_name: request.input.book_name,
          author_firstname: request.input.author_firstname,
          author_lastname: request.input.author_lastname,
          genre: request.input.genre
        },
        ["id", "book_name", "author_firstname", "author_lastname", "genre"]
      );
  },

  UpdateReview: request => {
    return knex("books")
      .where({ book_name: request.book_name })
      .update(
        {
          review: request.input.review
        },
        [
          "id",
          "book_name",
          "author_firstname",
          "author_lastname",
          "genre",
          "review",
          "rating"
        ]
      );
  },

  UpdateRating: request => {
    return knex("books")
      .where({ book_name: request.book_name })
      .update(
        {
          rating: request.input.rating
        },
        [
          "id",
          "book_name",
          "author_firstname",
          "author_lastname",
          "genre",
          "review",
          "rating"
        ]
      );
  }
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
