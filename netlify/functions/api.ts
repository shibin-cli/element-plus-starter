import express, { Router } from 'express'
import serverless from 'serverless-http'
import mockMethods from '../../mock'
const api = express()

const router = Router()
mockMethods.forEach((config) => {
  router.get(config.method)
  router[config.method](config.url, config.response)
})

api.use('/', router)

export const handler = serverless(api)
