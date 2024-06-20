import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { config } from 'dotenv'
import path from 'path'
import cors from 'cors';

import { logMiddlware } from './middlewares'
import {expensesRouter } from './routes/expenses'

import { connectDB } from './config/db'

config()

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My API with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'John Doe',
        url: 'https://example.com',
        email: 'john@doe.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
}

const port = process.env.PORT || 3000

async function run() {
  try {
    const app = express()

    app.use(bodyParser.json())

    const specs = swaggerJsdoc(options)

    app.use(logMiddlware)
    // app.use(authMiddleware)

    app.use('/files', express.static(path.join(__dirname, '../public')))
    app.use('/files', express.static(path.join(__dirname, '../files')))

    connectDB()

    app.get('/', (request: Request, response: Response) => {
      response.send('Hello World!')
    })

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
    app.use(cors())

    app.use("/expense", expensesRouter) 


    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    })
  } finally {
    // Ensures that the client will close when you finish/error
  }
}

run()
