import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import uploadConfig from './configs/upload.js'
import { sqliteConnection } from './database/sqlite/index.js'
import routes from './routes/index.js'
import { AppError } from './utils/AppError.js'

sqliteConnection()

const app = express()
app.use(express.json())

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use(cors())
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  console.log(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))
