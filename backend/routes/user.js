const express =require('express')
const { register,login ,addFriend ,removeFriend,getAllUsers} =require('../controllers/User')
const useRouter = express.Router()


useRouter.delete("/removeFriend", removeFriend);
useRouter.post("/addFriend", addFriend);
useRouter.post('/register', register)
useRouter.post('/login',login)
useRouter.get('/getAllUsers',getAllUsers)

module.exports =useRouter