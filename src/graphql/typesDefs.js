const {gql} = require('graphql-tag')

const typeDefs = gql`

    type Post {
        id: ID!
        body: String!
        created_at: String!
        username: String!
        updated_at: String!
    }

    type User {
        id: ID!
        username: String!
        token: String!
        email: String!
        created_at: String!
        updated_at: String!
    }

    type UserGroup {
        id: ID!
        username: String!
        email: String!
        created_at: String!
        updated_at: String!
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
    }
`


module.exports = typeDefs