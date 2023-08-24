const Post = require("../models/Post");



const addPost = async (req, res) => {
  const { image, description } = req.body;
  const authorId = req.token.userId;
  const username=req.token.name
  console.log("image:", image);
  console.log("description:", description);
  console.log("authorId:", authorId);
  console.log("username:", username);
  console.log("Request Body:", req.body);
  try {
    const newPost = new Post({
      image,
      description,
      username:username,
      author:authorId,
      
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
      message: "All the articles",
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

const postUser = async (req, res) => {
  const authorId = req.query.author;
  
  try {
    const posts = await Post.find({ author: authorId });
    if (posts.length > 0) {
      return res.status(200).json({
        success: true,
        message: `All the articles for the author: ${authorId}`,
        posts,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `The author => ${authorId} has no articles`,
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

const postId = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (post) {
      return res.status(200).json({
        success: true,
        message: `The post ${postId}`,
        post,
      });
    } else {
      return res.status(500).json({
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



module.exports = {
  addPost,
  showPost,
  postUser,
  postId,
  updateById,
  deleteById,
  createComment 
};
