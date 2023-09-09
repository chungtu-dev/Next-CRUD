const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    todo: {
        type: String,
    },
}, { timestamps: true })

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema)