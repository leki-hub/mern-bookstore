import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Mern stack tutorial");
});

// get all books to the database



//link mongoose local to mongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });

  // a pot request from /books end pont
app.post("/books", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.PublishYear
      ) {
        return response.status(400).send({
          message: "Send all required fields,title, author, PublishYear",
        });
      }
  
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      //first create a book in the database
      const book = await Book.create(newBook);
      return response.status(201).send(book);
    } catch (error) {
      console.error(error.message);
      return response.status(500).send({ message: error.message });
    }
  });
  