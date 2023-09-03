const Post = require("../models/Post");
const User = require("../models/UserSchema");


const addPost = async (req, res) => {
  const { image, description } = req.body;
  const authorId = req.token.userId;
  const username=req.token.name
const img =req.token.image
  try {
    const newPost = new Post({
      image,
      description,
      username:username,
      author:authorId,
      img:img
    });
    console.log("usus:", newPost);
    await newPost.save();
    return res.status(201).json({
      success: true,
      message: " created",
      posts: newPost,
    
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      err: error.message,
    });
  }
};

const showPost = async (req, res) => {
  try {
    const posts = await Post.find().populate('comments.commenter', 'username').exec()
    return res.status(200).json({
      success: true,
      message: "All the post",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      err: error.message,
    });
  }
};





const updateById = async (req, res) => {
  const postId = req.params.id;
  const newData = req.body;
  try {
    const update = await Post.findByIdAndUpdate(postId, newData, { new: true });

    if (update) {
      return res.status(200).json({
        success: true,
        message: "post updated",
        post: update,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `The post with id => ${postId} not found`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      err: error.message,
    });
  }
};

const deleteById = async (req, res) => {
  const postId = req.params.id;

  try {
    const deletePost = await Post.findByIdAndDelete(postId);

    if (deletePost) {
      return res.status(200).json({
        success: true,
        message: `Deleted Post for the author => ${postId}`,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No Post for this author",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      err: error.message,
    });
  }

};

const createComment = async (req, res) => {
  const postId = req.params.id;
  const { comment } = req.body;
  const commenter = req.token.userId;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment,
            commenter
          }
        }
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: `The POST with id => ${postId} not found`
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Comment created',
      comment: updatedPost.comments[updatedPost.comments.length - 1]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      err: error.message
    });
  }

};
const getPostById =async(req,res)=>{
  const userId = req.params.userId
 
  try{
    const user = await User.findById(userId)

    if(!user){
      return res.status(405).json({message:'post not found'})
    }
    const posts = await Post.find({ author: userId });
    res.json(posts)
  } catch (error){
    res.status(500).json({error:"fail",message:error.message})
  }
}






module.exports = {
  addPost,
  showPost,
  updateById,
  deleteById,
  createComment ,
  getPostById
};
