import React, { useState } from 'react'
import Todo from '../../models/Todo'
import axios from 'axios'

export async function getStaticProps() {
    const mongoose = require('mongoose')
    // const Todos = require('../../models/Todo')

    await mongoose.connect('mongodb+srv://admin:cRM9OhAQA7JIwSYK@cluster0.jpzvwzk.mongodb.net/test?retryWrites=true&w=majority').then(() => console.log('Connect Success to DB'))

    const todos = await Todo.find().sort({ createdAt: 'desc' })
    return {
        props: {
            todos: JSON.parse(JSON.stringify(todos))
        }
    }
}

const displayTodos = ({ todos }) => {
    // console.log(todos);

    const [visibility, setVisibility] = useState(false)
    const [title, setTitle] = useState('')
    const [todo, setTodo] = useState('')
    const [todoId, setTodoId] = useState('')

    const editForm = (title, todo, todoId) => {
        setVisibility(visibility => !visibility)
        setTitle(title)
        setTodo(todo)
        setTodoId(todoId)
    }

    const updateTodo = async (todoId) => {
        const todoObj = {
            title: title,
            todo: todo
        }
        console.log('todo update', todoObj);
        await axios.put(`/api/updateTodo?id=${todoId}`, todoObj)
            .then(() => {
                window.location.reload(false)
            })
    }

    const deteleTodo = async (todoId) => {
        await axios.delete(`/api/deleteTodo?id=${todoId}`)
            .then(() => { window.location.reload(false) })
    }

    return (
        <>
            <div className='container'>
                <table className="table table-light table-striped-columns">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Todo</th>
                            <th scope="col">Option</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {
                            todos.map((i) => (
                                <tr key={i._id}>
                                    <td>{i.title}</td>
                                    <td>{i.todo}</td>
                                    <td>
                                        <button type="button" className="btn btn-success" onClick={() => editForm(i.title, i.todo, i._id)}>Edit</button>
                                        <button type="button" className="btn btn-danger" onClick={()=>deteleTodo(i._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                visibility &&
                <div className="container">
                    <h1>Update Todo</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" aria-describedby="textHelp" onChange={(e) => setTitle(e.target.value)} value={title} />
                            <div id="textHelp" className="form-text">Update title</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="todo" className="form-label">Todo</label>
                            <input type="text" className="form-control" id="todo" aria-describedby="todoHelp" onChange={(e) => setTodo(e.target.value)} value={todo} />
                            <div id="todoHelp" className="form-text">Update new todo</div>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => updateTodo(todoId)}>Submit</button>
                        <button type="submit" className="btn btn-danger" onClick={() => setVisibility(visibility => !visibility)}>Cancel</button>
                    </form>
                </div>
            }
        </>
    )
}

export default displayTodos