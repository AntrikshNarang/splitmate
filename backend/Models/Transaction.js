const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  payers: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      amount: {
        type: Number,
      },
    },
  ],
});
const Transaction = mongoose.model("transaction", TransactionSchema);
module.exports = Transaction;
