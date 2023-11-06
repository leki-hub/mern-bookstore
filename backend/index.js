import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import router from "./routes/booksRoute.js";
import cors from "cors"
const app = express();
// middleware for parsing request body
app.use(express.json());
app.use(cors())

// app.use(cors({
//   origin: 'https://localhost:3333',
//   methods:['GET','PUT','POST','DELETE'],
//   allowedHeaders:["Content-Type"]
// }))



app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Mern stack tutorial");
});



   app.use("/books",router)











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


  