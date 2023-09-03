const express =require('express')
const MessageRouter =express.Router();

const {createMessage,getMessagesByConversationId} = require('../controllers/Message');

MessageRouter.post('/makemessage', createMessage);


MessageRouter.get('/chats/:conversationId', getMessagesByConversationId);





module.exports=MessageRouter