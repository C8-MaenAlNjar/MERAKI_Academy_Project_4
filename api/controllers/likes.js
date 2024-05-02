import prisma from "../lib/prisma.js";

export const addlike = async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    const existingLike = await prisma.likes.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });
    if (existingLike) {
      throw new Error("User has already liked the post");
    }

    const newLike = await prisma.likes.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
    return res.status(200).json(newLike);
  } catch (err) {
    console.log(err);
  }
};
export const removeLike = async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;
  try {
    const existingLike = await prisma.likes.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });
    if (!existingLike) {
      throw new Error("User has not liked the post");
    }

    await prisma.likes.delete({
      where: {
        id: existingLike.id,
      },
    });

    return res.status(200).json({ message: "Like removed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const getLikes = async (req, res) => {
  const postId = req.params.id;
  try {
    const likes = await prisma.likes.findMany({
      where: {
        postId: postId,
      },
    });
    res.status(200).json(likes);
  } catch (err) {
    console.log(err);
  }
};
