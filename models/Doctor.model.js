const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const doctorSchema = new Schema(
  {
    username: {
        type: String,
        required: [true, "User name is required,"],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },

    photo: {
        type: String,
        trim: true,
    },
    // dob: {
    //     type: String
    // },
    price: {
        type: Number
    },
    department: {
         type: String
    },
    gender: {
        type: [String],
        enum: ["M", "F", "N/A"],
    },
    // bloodtype: {
    //   type: String;
    // }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Doctor = model("Doctor", doctorSchema);

module.exports = Doctor;
