const express =require('express')
const postRouter =express.Router();
const {addPost,showPost,updateById,deleteById,createComment,getPostById} =require('../controllers/Post')


const authentication = require("../middleware/authentication");
const authorization = require('../middleware/Authorization');



postRouter.get('/getPost/:userId',getPostById)
postRouter.get('/showposts/:userId',authentication,authorization('CREATE_COMMENTS'),showPost)


postRouter.post('/addpost',  authentication,authorization('CREATE_COMMENTS'),addPost)



postRouter.put('/updatepost/:id', authentication,authorization('CREATE_COMMENTS'),updateById)
postRouter.delete('/post/:id',deleteById)
postRouter.post('/comments/:id',authentication,authorization('CREATE_COMMENTS'),createComment )


module.exports= postRouter