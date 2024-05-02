import prisma from "../lib/prisma.js";

export const addPost = async (req, res) => {
  const body = req.body;
  const authorId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: authorId,
      },
    });
    return res.status(200).json({
      success: true,
      message: " post created successfully",
      posts: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "fail" });
  }
};
export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: true,
        Likes: true,
      },
    });
    const postUserPromises = posts.map(async (post) => {
      const user = await prisma.user.findFirst({
        where: {
          id: post.userId,
        },
        select: {
          username: true,
          avatar: true,
        },
      });
      return user;
    });
    const postUsers = await Promise.all(postUserPromises);
    const result = posts.map((post, index) => ({
      ...post,
      user: postUsers[index],
    }));
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};
export const getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        comments: true,
        Likes: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const commentsWithUserData = await fetchUserDataForItems(post.comments);
    const likesWithUserData = await fetchUserDataForItems(post.Likes);

    const postData = {
      ...post,
      comments: commentsWithUserData,
      Likes: likesWithUserData,
    };

    return res.status(200).json(postData);
  } catch (err) {
    console.error("Error getting post:", err);
    return res.status(500).json({ message: "Failed to get post" });
  }
};

async function fetchUserDataForItems(items) {
  if (!items) return [];

  return await Promise.all(
    items.map(async (item) => {
      const user = await prisma.user.findFirst({
        where: {
          id: item.userId,
        },
        select: {
          username: true,
          avatar: true,
        },
      });
      return {
        ...item,
        user: user,
      };
    })
  );
}

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const authorId = req.userId;
  try {
    const post = await prisma.post.findMany({
      where: {
        id: postId,
      },
    });

    if (post.userId !== authorId) {
      return res.status(403).json({ message: "fail" });
    }
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const updatePost = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "fail" });
  }
};
