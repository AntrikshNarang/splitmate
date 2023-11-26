const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      } 
  ],
  pendingTransactions: [
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'transaction'
        },
        amount:{
          type: Number,
        }
    }
  ],
  pendingRequests: [
 {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
  ],
  messages: [
    {
        type: String,
    }
  ]
});
userSchema.index({name: 'text', email: 'text'});
const User = mongoose.model("user", userSchema);
module.exports = User;
