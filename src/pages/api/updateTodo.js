const mongoose = require('mongoose');
import Todo from '../../../models/Todo'

async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).end()
    }
    const { id } = req.query
    const { title, todo } = req.body
    try {
        const { title, todo } = req.body
        await mongoose.connect('mongodb+srv://admin:cRM9OhAQA7JIwSYK@cluster0.jpzvwzk.mongodb.net/test?retryWrites=true&w=majority').then(() => console.log('Connect Success to DB'))
    } catch (error) {
        console.log(error);
    }

    try {
        const updateTodo = await Todo.findByIdAndUpdate(
            id,
            { title, todo },
            { new: true }
        )
        console.log(updateTodo)
        res.status(500).json(updateNote)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Not updated!'})
    } finally {
        mongoose.connection.close()
    }
}

export default handler