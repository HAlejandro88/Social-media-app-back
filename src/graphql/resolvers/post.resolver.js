const Post = require('../../models/post.model')

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
    }
}