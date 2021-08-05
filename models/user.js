// Using Node.js `require()`
// npm i mongoose
// npm i mongoose-unique-validator

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Agent } = require("./agent");
const { Customer } = require("./customer");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is required",
    trim: true,
    unique: "The username must be unique.",
    lowercase: true,
  },
  password: {
    type: String,
    required: "Please enter a password",
    trim: true,
    validate: {
      validator: function (v) {
        return /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,}$/.test(
          v
        );
      },
      message: (props) =>
        `Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 6 characters.`,
    },
  }, // more fields defined below
  role: {
    type: String,
    trim: true,
    default: "customer",
  },
  customerId: { type: Number, ref: "Customer", default: null },
  agentId: { type: Number, ref: "Agent", default: null },
});

userSchema.virtual("userDetails").get(async function () {
  if (this.role === "customer") {
    return await Customer.findById(this.customerId);
  } else {
    return await Agent.findById(this.agentId);
  }
});

userSchema.plugin(uniqueValidator);
// Create a model User using the userSchema
module.exports.User = mongoose.model("User", userSchema);
