const mongoose = require('mongoose');
import Todo from '../../../models/Todo'

async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).end()
    }
    const { id } = req.query
    try {
        await mongoose.connect('mongodb+srv://admin:cRM9OhAQA7JIwSYK@cluster0.jpzvwzk.mongodb.net/test?retryWrites=true&w=majority').then(() => console.log('Connect Success to DB'))
    } catch (error) {
        console.log(error);
    }
    try {
        await Todo.deleteOne({_id: id})
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'Delete Error!' })
    } finally {
        mongoose.connection.close()
    }
}

export default handler