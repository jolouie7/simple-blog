const mongoose = require("mongoose");

//schema from https://stackoverflow.com/questions/42608919/mongoose-user-model-for-handling-local-and-social-auth-providers
let userSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    name: { type: String },
    password: { type: String },
    roles: [String],
    confirmation_code: String,
    confirmed: { type: Boolean, default: false },
    facebook: {
      id: String,
      token: String,
      email: String,
      name: String,
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);