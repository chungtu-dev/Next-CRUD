import axios from "axios"
import { useState } from "react"
import Swal from 'sweetalert2'

export default function Home() {

  const [title, setTitle] = useState('')
  const [todo, setTodo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const todoObj = {
      title, todo
    }
    console.log(todoObj);
    axios.post('/api/newTodo', todoObj).then(()=>{
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  return (
    <>
      <div className="container">
        <h1>Create Todo</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="textHelp" onChange={(e) => setTitle(e.target.value)} />
            <div id="textHelp" className="form-text">What's title</div>
          </div>
          <div className="mb-3">
            <label htmlFor="todo" className="form-label">Todo</label>
            <input type="text" className="form-control" id="todo" aria-describedby="todoHelp" onChange={(e) => setTodo(e.target.value)} />
            <div id="todoHelp" className="form-text">And what's ur todo</div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
