import React, {useState} from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import { useNavigate } from 'react-router-dom'

const CreateBooks = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setYear] = useState('')
  const[loading, setLoading]  = useState(true)
  let navigate = useNavigate()
   const data ={
    title,
    author,
    publishYear
   }

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:5554/books',data)
    .then(()=>{
      setLoading(false)
      console.log("book created")
      setTimeout(()=>{navigate('/')},2000)
    })
    .catch(err=>console.log(err))
  }
  return (
    <div className='mx-4'>

      <h1>Create Books</h1>
      <form onSubmit={handleSubmit}>
        <div my-4>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
        <input type="text" placeholder='Enter Title' value={title} onChange={e=>setTitle(e.target.value)}  className='border-2 border-gray-500 px-4 py-2'/>
        </div>
        <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Author</label>
           <input type="text" placeholder='Enter Author Name' value={author} onChange={e=>setAuthor(e.target)}  className='border-2 border-gray-500 px-4 py-2'/>
        </div>
       
        <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
        <input type="text" placeholder='Enter Author Name' value={publishYear} onChange={e=>setYear(e.target)} className='border-2 border-gray-500 px-4 py-2' />

        </div>
       
     
        
      </form>
    </div>
  )
}

export default CreateBooks
