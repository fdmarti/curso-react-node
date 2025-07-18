import mongoose from 'mongoose'

process.loadEnvFile()

const URI_DB = process.env.MONGO_URI ?? ''

const connect = async (): Promise<boolean> => {
  try {
    await mongoose.connect(URI_DB)
    console.log('Connected to Mongo :D')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export { connect }
