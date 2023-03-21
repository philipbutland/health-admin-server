const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
  {
    doctor: {type: Schema.Types.ObjectId, ref: "Doctor"},
    patient: {type: Schema.Types.ObjectId, ref: "Patient"},
    date: 
    {
      type: String,
      required: [true, "Please enter a date"],
    },
    department: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;
