import Todo from '../../../models/Todo';

const mongoose = require('mongoose');

async function handler(req, res) {
    if(req.method !== 'POST'){
        return res.status(405).end()
    }
    try {
        const { title, todo} = req.body
        await mongoose.connect('mongodb+srv://admin:cRM9OhAQA7JIwSYK@cluster0.jpzvwzk.mongodb.net/test?retryWrites=true&w=majority').then(()=>console.log('Connect Success to DB'))

        const newTodo = new Todo({title, todo})
        await newTodo.save()
        console.log(newTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Error somewhere..."})
    }finally{
        mongoose.connection.close()
    }
}

export default handler;