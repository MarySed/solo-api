exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("books")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("books").insert([
        {
          book_name: "Harry Potter and the Sorcerers Stone",
          author_firstname: "J.K.",
          author_lastname: "Rowling",
          genre: "Fantasy",
          review:
            "It's Harry Potter! I liked these books a lot as a kid. In fact, I went to my first midnight book release for the 5th book. At a Walmart. I was really surprised by how many people there were. I didn't realize other people liked books too.",
          rating: 5
        },
        {
          book_name: "A Wizard of Earthsea",
          author_firstname: "Ursula",
          author_lastname: "Le Guin",
          genre: "Fantasy",
          review:
            "One of the greatest Fantasy series. Ursula Le Guin was a master and these books get better with each installment. Must read.",
          rating: 5
        },
        {
          book_name: "Legacy of Ashes: The History of the CIA",
          author_firstname: "Tim",
          author_lastname: "Weiner",
          genre: "Non-Fiction",
          review:
            "If you want a thoroughly researched history of the CIA that manages to combine both readability and a ton of information, this is the book for you. You won't find conspiracy theories here, just an engaging story of how the agency was built and what it did for the next 70 years.",
          rating: 5
        }
      ]);
    });
};
