import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { BlogType, CommentType, UserType } from "../schema/schema";
import User from "../models/User";
import Blog from "../models/Blog";
import Comment from "../models/Comment";
import { Document, startSession } from 'mongoose';
import { compareSync, hashSync } from 'bcryptjs';

type DocumentType = Document<any, any, any>

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        //get all Users
        users: {
            type: new GraphQLList(UserType),
            async resolve() {
                return await User.find();
            },
        },
        //get blogs
        blogs: {
            type: new GraphQLList(BlogType),
            async resolve() {
                return await Blog.find();
            },
        },
        //get all Commnets
        comments: {
            type: new GraphQLList(CommentType),
            async resolve() {
                return await Comment.find();
            },
        },
    }
});

const mutations = new GraphQLObjectType({
    name: 'mutations',
    fields: {
        //user signup
        signup: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, { email, name, password }) {
                let existingUser: DocumentType
                try {
                    existingUser = await User.findOne({ email })
                    if (existingUser) return new Error("User Alreardy Exist")
                    const encryptedPassword = hashSync(password)
                    const user = new User({
                        name,
                        email,
                        password: encryptedPassword,
                    })
                    return await user.save()
                } catch (error) {
                    return new Error("Error Signup Failed:Try Again")
                }
            }
        },
        //user login 
        login: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, { email, password }) {
                let existingUser: DocumentType
                try {
                    existingUser = await User.findOne({ email })
                    if (!existingUser) return new Error("No User Register With This Email")
                    const dcryptedPassword = compareSync(
                        password,
                        // @ts-ignore
                        existingUser?.password
                    );
                    if (!dcryptedPassword) {
                        return new Error('Incorrct Password')
                    }
                    return existingUser;
                } catch (error) {
                    return new Error(error)
                }
            }
        },
        //create blog
        addBlog: {
            type: BlogType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                date: { type: new GraphQLNonNull(GraphQLString) },
                user: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, { title, content, date, user }) {
                let blog: DocumentType
                const session = await startSession()
                try {
                    session.startTransaction({ session });
                    blog = new Blog({ title, content, date, user });
                    const existingUser = await User.findById(user)
                    if (!existingUser) {
                        return new Error("User Not Found")
                    }
                    existingUser.blogs.push(blog);
                    await existingUser.save({ session })
                    return await blog.save({ session });
                } catch (error) {
                    return new Error(error);
                } finally {
                    await session.commitTransaction()
                }
            }
        },
        //update blog
        updateBlog: {
            type: BlogType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, { id, title, content }) {
                let existingBlog: DocumentType
                try {
                    existingBlog = await Blog.findById(id)
                    if (!existingBlog) {
                        return new Error('Blog dose not exist')
                    }
                    return await Blog.findByIdAndUpdate(id, {
                        title,
                        content,
                    },
                        {
                            new: true,
                        },
                    );
                } catch (error) {
                    return new Error(error);
                }
            }
        },
        //delete blog
        deleteBlog: {
            type: BlogType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, { id }) {
                let existingBlog: DocumentType
                const session = await startSession()
                try {
                    session.startTransaction({ session });
                    existingBlog = await Blog.findById(id).populate("user");
                    //@ts-ignore
                    const existingUser = existingBlog?.user;
                    if (!existingUser) {
                        return new Error("No User linked with this blog")
                    }
                    if (!existingBlog) {
                        return new Error("No blog Found")
                    }
                    existingUser.blogs.pull(existingBlog);
                    await existingUser.save({ session });
                    return await Blog.findByIdAndRemove(id)
                } catch (error) {
                    return new Error(error)
                }
            }
        }

    },
})

export default new GraphQLSchema({ query: RootQuery, mutation: mutations })