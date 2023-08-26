const User = require("../models/UserSchema");
const Role = require("../models/role");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, password, email, name, image } = req.body;

  try {
    const user = new User({
      username,
      password,
      email,
      name,
      role: "64e84a4d8b235de09180b5c6",
      image,
    });
    await user.save();
    res.json({ message: "user registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Registraion failed", message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      console.log(user.role);
      const role = await Role.findById(user.role);

      const payload = {
        userId: user._id,
        name: user.name,
        role: {
          role: role.role,
          permissions: role.permissions,
        },
      };

      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "60m" });
      return res.status(200).json({
        success: true,
        message: "Valid login credentials",
        token: token,
        userId: user._id,
        username: user.username,
        name: user.name,
        image: user.image,
        friends:user.friends
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
const addFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({
        success: false,
        message: "Friend is already added",
      });
    }

   
    user.friends.push(friendId);
    
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Friend added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



const removeFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.friends.includes(friendId)) {
      return res.status(400).json({
        success: false,
        message: "Friend not found in the user's friends list",
      });
    }

    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Friend removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to get users", message: error.message });
  }
};

const FriendsList = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const friendsList = await User.find({ _id: { $in: user.friends } });
    res.json({ friends: friendsList });
  } catch (error) {
    res.status(500).json({ error: "Failed to get friend list", message: error.message });
  }
};

module.exports = {
  register,
  login,
  addFriend,
  removeFriend,
  getAllUsers,
  FriendsList
};
