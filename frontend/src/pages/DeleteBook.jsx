import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const shouldDelete = confirm("Deleting a book ");
    
    if (shouldDelete) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5554/books/${id}`);
        setLoading(false);
        navigate('/'); 
      } catch (error) {
        console.error('Error', error);
        setLoading(false);
      }
    }
  };
  

  return (
    <div className='p-4' >
      <BackButton  />
      <h1 className='text-3xl my-4 '>Delete Book </h1>
      { loading ? <Spinner/> :""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h1 className='text-2xl'>Are Sure you want to delete this book ?.</h1>
        <button className='p-4 bg-red-400 text-white m-8 w-full' onClick={handleDelete}>
           Delete Book
        </button>

      </div>

    </div>
  )
}
export default DeleteBook;

