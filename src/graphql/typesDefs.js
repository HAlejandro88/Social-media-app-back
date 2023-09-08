const {gql} = require('graphql-tag')

const typeDefs = gql`

    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        updatedAt: String!
        comments: [Comment]!
        likes: [like]!
    }

    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }

    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }

    type User {
        id: ID!
        username: String!
        token: String!
        email: String!
        createdAt: String!
        updatedAt: String!
    }

    type UserGroup {
        id: ID!
        username: String!
        email: String!
        createdAt: String!
        updatedAt: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query {
        getPosts: [Post]
        getUsers: [UserGroup]
        getPost(postId:ID!): Post!
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username:String!, password:String!): User!
        createPost(body: String!): Post!
        deletePost(postId:ID!): String!
        createComment(postId: String!, body:String!): Post!
        deleteComment(postId:ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
`


module.exports = typeDefs