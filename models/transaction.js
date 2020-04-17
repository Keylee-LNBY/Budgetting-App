//require Mongo's mongoose to communicate with the DB
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Creates a new Mongoose Transaction that will be placed in the DB
const transactionSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Enter a name for transaction"
    },
    value: {
      type: Number,
      required: "Enter an amount"
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

//Creates a mongoose model to be exported to front end pages so info can be gathered and put to the DB
const Transaction = mongoose.model("Transaction", transactionSchema);

//exports the model
module.exports = Transaction;
