require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
const connectDB = () => {
   return mongoose.connect(`${url}NotePad`)
}

module.exports = connectDB