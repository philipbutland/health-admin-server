const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId, ref:'Doctor'
    },
    doctorName: {
      type: String, ref:'DoctorName'   
    },
    patientId: {
      type: Schema.Types.ObjectId, ref:'Patient'
    },
    dateTime: {
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
