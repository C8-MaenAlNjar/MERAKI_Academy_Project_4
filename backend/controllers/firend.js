const Friend = require('../models/friends'); 
const mongoose = require('mongoose');

const addFriend = {
  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.body;

      console.log('userId:', userId);
      console.log('friendId:', friendId);


      const existingFriendship = await Friend.findOne({ user: userId, friend: friendId });
      if (existingFriendship) {
        return res.status(400).json({ error: 'Friend is already added' });
      }
      
      const newFriendship = new Friend({
        user: userId,
        friend: new mongoose.Types.ObjectId(friendId)
      });

      await newFriendship.save();

      res.status(201).json({ message: 'Friend added successfully' });
    } catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).json({ error: 'An error occurred while adding a friend', details: error.message });
      }
  },
  getFriends: async (req, res) => {
    try {
      const userId = req.params.userId;

      
      const friends = await Friend.find({ user: userId }).populate('friend', 'username');

      res.status(200).json(friends);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving friend list' });
    }
  },

};

module.exports = addFriend;
