import express from 'express'
import { auth_middleware } from './auth_middleware.js'
import { get_user } from './get_user.js'
import { put_user } from './put_user.js'
import { delete_user } from './delete_user.js'


export const auth_router = express.Router();
auth_router.use(auth_middleware)
auth_router.get('/user', get_user)
auth_router.put('/user', put_user)
auth_router.delete('/user', delete_user)