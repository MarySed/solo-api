This was created during my time as a student at Code Chrysalis

# Description

Personal Library is basically a personal GoodReads.
You can use this to record, review, and rate the books you've read.
You can also update or delete books, reviews, and ratings.

I've implemented a few search options, so you should find that you have a lot of flexibility in finding books, whether by name, author, or rating.

# Beginner's Guide

## Initial Setup

After you've cloned this project to your computer, there are a few more steps before this personal Books API is ready to use.

<details><summary> 1. Install dependencies.</summary><br>

First, install dependencies by running:

```bash
    yarn
```

</details>

<details><summary> 2. Create the books database </summary><br>

Then, we want to create a "books" database. This can be done by entering the following command in your terminal.

```bash
    echo "CREATE DATABASE books;" | psql
```

Now, let's check the database you've just made by entering `psql` into your terminal, followed by `\c books`. Finally, write `\dt books` and you'll notice you have no tables!

</details>

<details><summary> 3. Create a books table inside your new database using a migration </summary><br>

So, we need to create a table.

To do this, run:

```bash
    yarn migrate
```

If you check it again, you'll now see the following:

```

Schema | Name | Type | Owner
--------+----------------------+-------+----------
public | books | table | postgres
public | knex_migrations | table | postgres
public | knex_migrations_lock | table | postgres
(3 rows)

```

We've got a books table!

</details>

<details><summary> 4. Seeding the table </summary><br>

Right now, if you check our books table, you'll notice that it is totally empty. Luckily, we have some data you can seed it with.
Check the `./seeds` folder if you want to see how this works.

Run:

```bash
    yarn seed
```

and see what happens when you use `psql` and

```bash
SELECT * FROM books;
```

</details>

<details><summary> 5. Rolling back our changes. </summary><br>

Did something go wrong? You can use

```bash
    yarn rollback
```

to delete the books table and start from scratch.

</details>

<details><summary>6. Common Errors</summary><br>

One of the more common error messages you might get is `Cannot find module 'pg'`. If this appears, make sure you have postgres installed by running

```bash
yarn add pg
```

</details>

## How to Use Personal Library

Once you've finished setting everything up, run `yarn dev` in the terminal to start the server.
If you open the `index.html` file in your browser, you'll be able to see the GraphiQL terminal.

### Adding books:

```bash
AddBook(book_name: "name", author_firstname: "firstname", author_lastname: "lastname", genre: "genre", review: "review", rating: "rating")
```

### Deleting books:

```bash
DeleteBook(book_id: id)

```

### Searching by Genre

```bash
BooksByGenre(genre: "genre")
```

All of the commands available to you can also be found in the GraphiQL documentation panel.
Have fun!

## Personalizing the App

Do you want to add a totally new table?
You can add a migration by running `knex migrate:make your_table_name --knexfile ./knexfile.js` in your terminal!
