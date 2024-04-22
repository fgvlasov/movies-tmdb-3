import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { config } from 'dotenv'
import { root_router } from './api/root_router.js'
import { initModules } from './initModules.js'
import cookieParser from "cookie-parser"
import compression from "compression"

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
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['POST','GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })) 
  // Define app routes
  app.use('/', root_router)
  app.get('/', (req, res) =>
    res.status(200).send('Hello from backend server!')
  )
  // Define app port
  let port = process.env.PORT || 8080
  // Start listening server
  const server = app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
}

init()