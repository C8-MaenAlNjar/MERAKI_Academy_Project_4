import prisma from "../lib/prisma.js";

export const showComments = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    console.log(err);
  }
};
export const addComments = async (req, res) => {
  const postId = req.params.id;
  const {description} = req.body;
  const userId = req.userId;
  try {
    const newComment = await prisma.comment.create({
      data: {
        description: description,
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
    });
    return res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
  }
};
