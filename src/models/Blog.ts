import { Schema, model } from 'mongoose'
const blogSchema: Schema = new Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
});

export default model("Blog", blogSchema);