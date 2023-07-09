import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql'

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

export const BlogType = new GraphQLObjectType({
    name: 'BlogType',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

export const CommentType = new GraphQLObjectType({
    name: 'CommnentType',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: new GraphQLNonNull(GraphQLString) }
    }),
})

