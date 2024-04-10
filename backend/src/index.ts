import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { config } from 'dotenv'
import { root_router } from './api/root_router.js'
import { initModules } from './initModules.js'
import cookieParser from "cookie-parser"
import compression from "compression"

// @ts-ignore
import router from "../routes/users"

// Initialize express server  
const init = async () => {
  // Add .env vars
  config()
  await initModules()
  const app = express()
  // Middleware to parse JSON bodies
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(compression())
  // Enable CORS for all routes
  app.use(cors({
    credentials: true
  })) 
  app.use('/', root_router)
  app.get('/', (req, res) =>
    res.status(200).send('Hello from backend server!')
  )

  let port = process.env.PORT || 8080

  const server = app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })

  process.on('SIGTERM', () => {
    server.close(() => {
      process.exit(0)
    })
  })

  process.on('SIGINT', () => {
    server.close(() => {
      process.exit(0)
    })
  })
}

init()