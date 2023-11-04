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
    .then(res=>{
      
      console.log("book created")
    })
    .catch(err=>console.log(err))
  }
  return (
    <div>

      <h1>Create Books</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Title' value={title} onChange={e=>setTitle(e.target.value)} />

      </form>
    </div>
  )
}

export default CreateBooks
