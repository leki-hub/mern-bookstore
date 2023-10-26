import mongoose from "mongoose";
const bookSchema= mongoose.Schema({
    title: { type: String, required: true },
})

export const Book = mongoose.Model('book',{name:string})