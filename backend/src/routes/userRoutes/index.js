import express from 'express'
import { UserController } from '../../controllers/user-controller.js'

const userRouter = express.Router({mergeParams: true})

userRouter.post('/sign-up', UserController.signup)
userRouter.post('/login', UserController.login)

export {userRouter}