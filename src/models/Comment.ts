import { Schema, model } from 'mongoose'
const commentSchema: Schema = new Schema({
    text: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
});

export default model("Comment", commentSchema);