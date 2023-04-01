const { Schema, model } = require("mongoose");

const patientSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "User name is required,"],
            unique: true,
        },
        email: {
          type: String,
          required: [true, "Email is required."],
          lowercase: true,
          trim: true,
        },
        photo: {
            type: String,
            trim: true,
        },
        dob: {
             type: String
        },
        gender: {
            type: [String],
            enum: ["M", "F", "N/A"],
        },
        bloodType: {
          type: [String],
          enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
        },
        appointment: [{
          type: Schema.Types.ObjectId, ref:'Appointment'
        }],
        // doctor: [{
        //   type: Schema.Types.ObjectId, ref:'Doctor'
        // }]
      },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Patient = model("Patient", patientSchema);

module.exports = Patient;