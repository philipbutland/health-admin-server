const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
  {
    doctorId: { type: String, ref: "Doctor" },
    patientId: { type: String, ref: "Patient"},
    dateTime: 
    {
      type: String,
      required: [true, "Please enter a date and time"],
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
