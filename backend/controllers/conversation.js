const Conversation = require("../models/conversation");

//new con
//get con of user
const createConversation = async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  const getConversationsByUserId = async (req, res) => {
    try {
      const conversations = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversations);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  const getConversationByUserIds = async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  };





module.exports = {
  createConversation,
  getConversationsByUserId,
  getConversationByUserIds,
};
