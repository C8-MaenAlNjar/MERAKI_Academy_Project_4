const express =require('express')
const { register,login } =require('../controllers/User')
const useRouter = express.Router()




useRouter.post('/register', register)
useRouter.post('/login',login)


module.exports =useRouter