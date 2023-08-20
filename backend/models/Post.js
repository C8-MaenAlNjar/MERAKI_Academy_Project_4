const mongoose = require("mongoose");




const postSchmea = new mongoose.Schema({
  Image: { type: String },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments :[{
    comment: { type: String, required: true },
    commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  }]
});


module.exports = mongoose.model("Post", postSchmea);
