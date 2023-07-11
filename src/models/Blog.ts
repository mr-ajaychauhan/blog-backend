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
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

export default model("Blog", blogSchema);