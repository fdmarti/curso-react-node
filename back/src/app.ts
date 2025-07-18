import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import BookRouter from './routes/books'
import UserRouter from './routes/auth'

import { connect } from './config/mongoConect'

const app = express()
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT ?? 3000

app.get('/', (_, res) => {
  res.send('Some message')
})

app.use('/api/auth', UserRouter)
app.use('/api/books', BookRouter)

app.listen(PORT, () => {
  console.log('Server running in port ', PORT)
  connect().catch((err) => console.error(err))
})
