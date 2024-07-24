import express, { Router } from 'express'
import serverless from 'serverless-http'
// import mockMethods from '../../mock'
const app = express()
const router = express.Router()

// Example route
router.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Netlify!' })
})

// Middleware to parse JSON
app.use(express.json())

// Use router
app.use('/api', router)

export const handler = serverless(app)
