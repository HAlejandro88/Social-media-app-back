const mongoose = require('mongoose')


const connectMongoDB = async () => {
    try {
        const connectionDb = await mongoose.connect('mongodb://localhost:27017/socialmedia')
        console.log(`MongoDB Connected: ${connectionDb.connection.host}`);
    } catch (error) {
        console.log('database connection error')
    }
}




module.exports = connectMongoDB