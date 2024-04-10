import express from 'express'
import { get_users } from './get_users.js'
import { post_singup } from './post_singup.js'
import { post_login } from './post_login.js'
import { auth_router } from './auth/auth_router.js'


export const root_router = express.Router();
root_router.get('/users', get_users)
root_router.post('/singup', post_singup)
root_router.post('/login', post_login)
root_router.use('/auth', auth_router)