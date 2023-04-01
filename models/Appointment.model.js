const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
  {
    // doctorObject: {
    //   type: Schema.Types.ObjectId, ref:'Doctor'
    // },
    // patientObject: {
    //   type: Schema.Types.ObjectId, ref:'Patient'
    // },
    doctorId: {
      type: String,
    },   
    patientId: {
      type: String,
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
