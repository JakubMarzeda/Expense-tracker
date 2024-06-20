import mongoose from 'mongoose'

export function connectDB() {
  const url = process.env.DB_URL ?? ''

  try {
    mongoose.connect(url, {})
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    }
    process.exit(1)
  }
  const dbConnection = mongoose.connection
  dbConnection.once('open', () => {
    console.log(`Database connected`)
  })

  dbConnection.on('error', (err) => {
    console.error(`connection error: ${err}`)
  })
  return
}
