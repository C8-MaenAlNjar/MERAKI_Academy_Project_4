const Role = require("../models/role");

const addRole = async (req, res) => {
  const { role, permissions } = req.body;

  try {
    const newRole = new Role({
      role,
      permissions,
    });
    await newRole.save();
    res.status(200).json({
      success: true,
      message: "success role created ",
      role: newRole,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
 module.exports={
    addRole
 }