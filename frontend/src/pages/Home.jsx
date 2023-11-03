import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios"
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import {AiOutlinedEdit} from "react-icons/ai"
import {BsInfoCircle} from "react-icons/bs";
import {MdOutlineAddBox ,MdOutlineAddDelete} from "react-icons/md";
const[books, setBooks] = useState([])
const{loading, setLoading} = useState(false)

const Home = () => {


useEffect(()=>{
  setLoading(true)
  axios.get("http//:localhost:5554/books")
  .then((res)=>{
    console.log(res);
    const data= res.data.data;
    setBooks(data)
    setLoading(false)
  })
 .catch((error)=>{
  alert('Error')
  setLoading(false)
 })
},[])

  return (
    <div className='p4 '>
      <div className='flex justify-between items-center'>
        <h1 className="text-3xl font-bold my-8">My Books</h1>
        <Link to="/books/create">
          <MdOutlineAddBox  className='text-sky-800 text-4xl'/>

        </Link>
      </div>
      { loading ?<Spinner /> : (
        <table className='w-full'>
          <thead>

          </thead>
        </table>
      )
       
     }
    </div>
  )
}

export default Home
