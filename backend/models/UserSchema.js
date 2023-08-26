const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const authentication = require("../middleware/authentication");



const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, require: true },
  name: { type: String, require: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }
  ,image: { type: String },
  friends: 
  [  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },]
  
  
});

userSchema.pre("save", async function () {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }

  if (!this.isModified("password")) return;
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  
});
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", userSchema);
