const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      firstname: {
        type: String,
        required: true,
        trim: true,
      },
      lastname: {
        type: String,
        required: true,
        trim: true,
      },
      hash_password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        maxlength: 10,
        minlength: 10,
      },
      role : {
        type : String,
        enum : ["Admin", "User"],
        default : "User"
      }
    },
    {
      timestamps: true,
    }
  );

  const userModel = new mongoose.model("User", userSchema);


  module.exports = {
      User : userModel,
      userSchema : userSchema,
  }