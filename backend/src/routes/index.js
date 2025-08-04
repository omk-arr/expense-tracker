import express from 'express'
// import { userRouter } from './userRoutes/index.js'
import { userRouter } from './userRoutes/index.js'

const router = express.Router()

router.use('/users', userRouter)

export {router}