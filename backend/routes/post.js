const express =require('express')
const postRouter =express.Router();
const {addPost,showPost,postUser,postId,updateById,deleteById,createComment} =require('../controllers/Post')


const authentication = require("../middleware/authentication");
const authorization = require('../middleware/Authorization');




postRouter.get('/posts',authentication,authorization('CREATE_COMMENTS'),showPost)
postRouter.post('/addpost',  authentication,authorization('CREATE_COMMENTS'),addPost)
postRouter.get('/posts/author',postUser)
postRouter.get('/posts/:id',postId)
postRouter.put('/updatepost/:id',updateById)
postRouter.delete('/post/:id',deleteById)
postRouter.post('/comments/:id',authentication,authorization('CREATE_COMMENTS'),createComment )


module.exports= postRouter