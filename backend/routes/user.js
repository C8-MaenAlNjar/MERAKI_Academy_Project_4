const express =require('express')
const { register,login ,addFriend } =require('../controllers/User')
const useRouter = express.Router()



useRouter.post("/addFriend", addFriend);
useRouter.post('/register', register)
useRouter.post('/login',login)


module.exports =useRouter