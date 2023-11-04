import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5554/books/${id}`);
      setLoading(false);
      navigate('/'); 
    } catch (error) {
      console.error('Error', error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? 'Deleting...' : 'Delete Book'}
      </button>
    </div>
  );
};

export default DeleteBook;

