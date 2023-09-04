const { AuthenticationError } = require('apollo-server')
const Post = require('../../models/post.model')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find()
                return posts
            } catch (e) {
                throw new Error(e)
            }
        },

        async getPost(_, {postId}) {
            try {
                const post = await Post.findById(postId)
                
                if(post) {
                    return post
                } else {
                    throw new Error(`No post found`)
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    },

    Mutation: {
        async createPost(_, { body }, context) {
            console.log(contex, 'this is the context');
            const user = checkAuth(context)

            console.log(user);

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username
            })

            const post = await newPost.save()

            return post
        },

        async deletePost(_, { postId }, context) {
            const user = checkAuth(context)
            try {
                const post = await Post.findById(postId)
                if(user.username === post.username) {
                    await post.deleteOne()
                    return 'Post deleted successfullt'
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch(error) {
                throw new Error(error)
            }
        }
    }
}