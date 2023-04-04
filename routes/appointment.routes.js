const router = require("express").Router();
const Appointment = require("../models/Appointment.model");
const mongoose = require("mongoose");
const Patient = require("../models/Patient.model");


router.post('/appointments/add-appointment', (req,res,next)=> {
    let globalAppointment
    const { doctorId, doctorName, patientId, dateTime, department } = req.body
    console.log("req.body", req.body)
    Appointment.create({ doctorId, doctorName, patientId, dateTime, department})
    .then(newAppointment=>{
        globalAppointment=newAppointment
        return Patient.findByIdAndUpdate(patientId,{$push:{appointment:globalAppointment._id}})
    })
    .then(() => {
      res.json(globalAppointment);
    })
    .catch(error=>console.log(error))
})

router.get("/appointments",(req,res,next)=>{
    console.log("GET")
    Appointment.find()
    .populate("doctorId patientId")
    .then(allAppointments=>{
        res.json(allAppointments)
    })
    .catch(error=>console.log(error))
})

router.get("/appointments/:appointmentId", (req,res,next) => {
    const { appointmentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
        res.status(400).json( {message: "Specified id is not valid"});
        return;
    }
    Appointment.findById(appointmentId)
    .populate("doctorId patientId")
    .then(oneAppointment=>{
        console.log(oneAppointment)
        res.json(oneAppointment)
    })
})

router.put("/appointments/:appointmentId", (req,res,next) => {
    const { appointmentId } = req.params;
    console.log ("body", req.body)
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
        res.status(400).json( {message: "Specified id is not valid"});
        return;
    }
    Appointment.findByIdAndUpdate(appointmentId, req.body,{new:true})
        .then((updatedAppointments) => res.json(updatedAppointments))
        .catch(error=>res.status(400).json( {message: error}))
});

router.get("/appointments/:patientId", (req, res, next) => {
  const { patientId } = req.params;
  console.log("GET");
  Appointment.find({ patientId })
    .then((allAppointments) => {
      res.json(allAppointments);
    })
    .catch((error) => console.log(error));
});

router.get("/appointments", (req, res, next) => {
  console.log("GET");
  Appointment.find()
    .then((allAppointments) => {
      res.json(allAppointments);
    })
    .catch((error) => console.log(error));
});

router.get("/appointments/:appointmentId", (req, res, next) => {
  const { appointmentId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Appointment.findById(appointmentId).then((oneAppointment) => {
    console.log(oneAppointment);
    res.json(oneAppointment);
  });
});

router.put("/appointments/:appointmentId", (req, res, next) => {
  const { appointmentId } = req.params;
  console.log("body", req.body);
  if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Appointment.findByIdAndUpdate(appointmentId, req.body, { new: true })
    .then((updatedAppointments) => res.json(updatedAppointments))
    .catch((error) => res.status(400).json({ message: error }));
});

router.delete("/appointments/:appointmentId", (req, res, next) => {
  const { appointmentId } = req.params;
  Appointment.findByIdAndDelete(appointmentId)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => res.status(400).json({ message: error }));
});

module.exports = router;
