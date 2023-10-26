import express from "express"
import { PORT } from "./config.js";
const app = express();

app.get('/',(request,response)=>{
    console.log("Hello World");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
