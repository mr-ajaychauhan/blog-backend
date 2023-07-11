import { Schema, model } from 'mongoose'
const userSchema: Schema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        minLength: 6,
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

export default model("User", userSchema);