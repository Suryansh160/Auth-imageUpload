const mongoose = require('mongoose')

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connection successfull!!')
  } catch (e) {
    console.error('MongoDB connection failed: ', e)
    process.exit(1)
  }
}

module.exports = connectToDB
