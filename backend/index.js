import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
// middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Mern stack tutorial");
});

// get all books from the database
app.get('/books', async (request, response)=>{
    try{
        const books = await Book.find({})
    return response.status(200).json({
      count:books.length,
      data:books
    })

    }
    catch(error){
       console.log('Error: ', error);
       response.status(500).send({message: error.message})
    }
})

// get book from the database based on id, ie dynamic routing
app.get('/books/:id', async (request, response)=>{
  try{
    const {id}=request.params;
      const book = await Book.findById(id)
  return response.status(200).json(book)

  }
  catch(error){
     console.log('Error: ', error);
     response.status(500).send({message: error.message})
  }
})


// update book in the database
app.put('books/:id' , async (request,response)=>{
  try {
    const { title, author, publishYear } = request.body; // Destructure the request body

    if (!title || !author || !publishYear) {
        return response.status(400).send({
            message: "Send all required fields: title, author, publishYear",
        });
      }
      const {id}=request.params;
      const result= await Book.findByIdAndUpdate(id, request.body)
  return response.status(200).json(book)


  }
  catch(error){
    console.log('Error: ', error.message);
   return  response.status(500).send({message: error.message})
  }
})






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

  // route for creating  a new book in database
app.post("/books", async (request, response) => {
  try {
      console.log(request.body); // Log the request body to see what's being received

      const { title, author, publishYear } = request.body; // Destructure the request body

      if (!title || !author || !publishYear) {
          return response.status(400).send({
              message: "Send all required fields: title, author, publishYear",
          });
      }

      const newBook = {
          title,
          author,
          publishYear
      };

      const book = await Book.create(newBook);
      return response.status(201).send(book);
  } catch (error) {
      console.error(error.message);
      return response.status(500).send({ message: error.message });
  }
});

  