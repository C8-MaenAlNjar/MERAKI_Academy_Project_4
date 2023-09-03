const express =require('express')
const { register,login ,getAllUsers,FriendsList,removeFriend,getUserById} =require('../controllers/User')
const userController = require('../controllers/User');

const authentication = require("../middleware/authentication");
const authorization = require('../middleware/Authorization');
const useRouter = express.Router()



useRouter.post('/register', register)
useRouter.post('/login',login)
useRouter.get('/getAllUsers',getAllUsers)
useRouter.get('/FriendsList/:userId',FriendsList)
useRouter.delete('/removefriend/:friendId', authentication, removeFriend);
useRouter.get('/user/:friendId', getUserById);

useRouter.post("/addFriend/:userId", authentication, async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.body.friendId;
  
      const result = await userController.addFriend(userId, friendId);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error adding friend:", error);
      res.status(500).json({ message: "An error occurred",error: error.message });
    }
  });
module.exports =useRouter