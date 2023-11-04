import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useNavigate,useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setYear] = useState("");
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  let {id} = useParams()
  useEffect(()=>{
    setLoading(false)
    axios.get(`http://localhost:5554/books/${id}`)
    .then((res)=>{
      setAuthor(res.data.author)
      setTitle(res.data.title)
      setYear(res.data.publishYear)
      setLoading(false)
    })
    .catch((err)=>{
      setLoading(false)
      alert("An error has occured" , err)
      console.log(err)
    })
  })



  const data = {
    title,
    author,
    publishYear,
  };

  const handleEdit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .put(`http://localhost:5554/books/${id}`, data)
      .then(() => {
        setLoading(false);
        console.log("book  edited");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        alert("An Error has happened , please check the console");
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {/* <form onSubmit={handleSubmit}> */}
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              placeholder="Enter Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="text"
              placeholder="Enter Author Name"
              value={publishYear}
              onChange={(e) => setYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <button className="p-4 bg-sky-300 m-8" onClick={handleEdit}>
            Save Book
          </button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default EditBook;
