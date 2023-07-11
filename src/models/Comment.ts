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
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

export default model("Comment", commentSchema);