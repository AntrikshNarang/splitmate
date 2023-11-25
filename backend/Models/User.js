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
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    },
  ],
  pendingTransactions: [
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'transaction'
        }
    }
  ],
  pendingRequests: [
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }
  ],
  messages: [
    {
        title: {
            type: String
        },
        description: {
            type: String,
        },
        acceptText: {
            type: String,
        },
        dismissText: {
            type: String,
        }
    }
  ]
});
const User = mongoose.model("user", userSchema);
module.exports = User;
