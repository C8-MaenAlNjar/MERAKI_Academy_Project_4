import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) return res.status(401).json({ message: "Faild to login" });
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return res.status(401).json({ message: "Password mismatch" });
    const age = 1000 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update users!" });
  }
};
// export const getAllUsers = async (req, res) => {
//   const id = req.userId;
//   console.log(id);
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: id },
//     });

//     return user;
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     throw new Error("Failed to fetch user");
//   }
// };

// const FriendsList = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const friendsList = await User.find({ _id: { $in: user.friends } });
//     res.json(friendsList);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Failed to get friend list", message: error.message });
//   }
// };

// const addFriend = async (userId, friendId) => {
//   // Receive userId and friendId as parameters
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       throw new Error("User not found");
//     }

//     const friend = await User.findById(friendId);
//     if (!friend) {
//       throw new Error("Friend not found");
//     }

//     user.friends.push(friendId);
//     await user.save();

//     return { message: "Friend added successfully" };
//   } catch (error) {
//     throw error;
//   }
// };
// const removeFriend = async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const friendId = req.params.friendId;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.friends = user.friends.filter((id) => id.toString() !== friendId);
//     await user.save();

//     return res.status(200).json({ message: "Friend removed successfully" });
//   } catch (error) {
//     console.error("Error removing friend:", error);
//     res
//       .status(500)
//       .json({ message: "An error occurred", error: error.message });
//   }
// };
// const getUserById = async (req, res) => {
//   try {
//     const userId = req.params.friendId;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
