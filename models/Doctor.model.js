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
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    photo: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
    },
    department: {
      type: String,
    },
    gender: {
        type: String,
        enum: ["M", "F", "N/A"],
    },
    // appointment: [{
    //   type: Schema.Types.ObjectId, ref:'Appointment'
    // }],
    // patient: [{
    //   type: Schema.Types.ObjectId, ref:'Doctor'
    // }]
  },
  {
    timestamps: true,
  }
);

const Doctor = model("Doctor", doctorSchema);

module.exports = Doctor;
