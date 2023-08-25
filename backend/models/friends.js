const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
      },
      friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
      }
   
})
const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;