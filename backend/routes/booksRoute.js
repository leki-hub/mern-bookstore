import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router()



// get all books from the database
router.get('/', async (request, response)=>{
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
router.get('/:id', async (request, response)=>{
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
router.put('/:id' , async (request,response)=>{
  try {
    const { title, author, publishYear } = request.body; // Destructure the request body

    const putBooks = {
      title,
      author,
      publishYear
  };



    if (!title || !author || !publishYear) {
        return response.status(400).send({
            message: "Send all required fields: title, author, publishYear",
        });
      }
      const {id}=request.params;
      const result= await Book.findByIdAndUpdate(id, putBooks)
      if(!result){
        return  response.status(404).send({message: "Id not found" })
      }
        return response.status(200).send({message:"Succesfully updated"})


  }
  catch(error){
    console.log('Error: ', error.message);
   return  response.status(500).send({message: error.message})
  }
})


router.delete('/:id', async (Request, Response)=>{
  try {
    const { id } = Request.params;
    const result = await Book.findByIdAndDelete(id);

    if (result === null) {
      return Response.status(404).json({ message: "Book not found" });
    }

    return Response.status(200).send({ message: "Successfully deleted" });
  }
  catch(err) {
    console.log("Error: ", err);
    return Response.status(500).send({ message: err.message });
  }
});



  // route for creating  a new book in database
  router.post("/", async (request, response) => {
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
export default router;