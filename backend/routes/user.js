const express =require('express')
const { register,login ,addFriend ,removeFriend,getAllUsers,FriendsList} =require('../controllers/User')
const useRouter = express.Router()


useRouter.delete("/removeFriend", removeFriend);
useRouter.post("/addFriend", addFriend);
useRouter.post('/register', register)
useRouter.post('/login',login)
useRouter.get('/getAllUsers',getAllUsers)
useRouter.get('/FriendsList/:userId',FriendsList)
module.exports =useRouter