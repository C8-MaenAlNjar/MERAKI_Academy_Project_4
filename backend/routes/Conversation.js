const express =require('express')
const conRouter =express.Router();
const {createConversation,getConversationsByUserId,getConversationByUserIds} =require('../controllers/conversation')

conRouter.post('/creatCon', createConversation);
conRouter.get('/find/:userId', getConversationsByUserId);
conRouter.get('/find/:firstUserId/:secondUserId', getConversationByUserIds);


module.exports=conRouter