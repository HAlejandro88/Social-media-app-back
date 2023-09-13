const mongoose = require('mongoose')
const { create } = require('./post.model')


const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
}, {
    timestamps: true
})


module.exports = mongoose.model('User', UserSchema)