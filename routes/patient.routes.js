const router = require("express").Router();
const Patient = require("../models/Patient.model");
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");
const bcrypt = require("bcrypt");
const Appointment = require("../models/Appointment.model");

const saltRounds = 10;

router.post("/upload", fileUploader.single("photo"), (req, res, next) => {

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

router.post("/patients/add-patient", (req, res, next) => {
  const { username, email, password, photo, dob, gender, bloodType } = req.body;

  let role = "patient";

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email, password" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(email)) {
    res.status(500).json({ message: "Provide a valid email address." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(500).json({message: "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter."});
    return;
  }

  Patient.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "Patient already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return Patient.create({username, email, photo, dob, gender, bloodType, password: hashedPassword,
      });
    })
    .then((createdPatient) => {
      const { email, _id, role } = createdPatient;
      const user = { email, _id, role };
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err));
});


router.get("/patients", (req, res, next) => {
  Patient.find()
    .then((allPatients) => {
      res.json(allPatients);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});


router.get("/patients/:patientId", (req, res, next) => {
  const { patientId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Patient.findById(patientId)
    .populate("appointment")
    .then((onePatient) => {
      res.json(onePatient);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});


router.put("/patients/:patientId", (req, res, next) => {
  const { patientId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Patient.findByIdAndUpdate(patientId, req.body, { new: true })
    .then((updatedPatients) => res.json(updatedPatients))
    .catch((error) => res.status(400).json({ message: error }));
});

router.delete("/patients/:patientId", async(req, res, next) => {
  const { patientId } = req.params;
  await Patient.findByIdAndDelete(patientId)
  const deletedAppointment= await  Appointment.deleteMany({patientId:patientId})
  res.json(deletedAppointment)
});



module.exports = router;
