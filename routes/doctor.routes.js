const router = require("express").Router();
const Doctor = require("../models/Doctor.model");
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");
const bcrypt = require("bcrypt");
const Appointment = require("../models/Appointment.model");
//const jwt = require("jsonwebtoken");
const saltRounds = 10;

router.post("/upload", fileUploader.single("photo"), (req, res, next) => {
  // console.log("file is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

router.post("/doctors/add-doctor", (req, res, next) => {
  const { username, email, photo, price, department, gender, password } = req.body;
  let role = "doctor";

  // Check if email or password or name are provided as empty strings
  if (email === "" || password === "") {
    // if (email === "" || password === "" || !username) {
    // console.log("email", email, "password", password);
    res.status(400).json({ message: "Provide email, password" });
    return;
  }

  // This regular expression check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(500).json({ message: "Provide a valid email address." });
    return;
  }

  // This regular expression checks password for special characters and minimum length
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(500).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  // Check the doctors collection if a doctor with the same email already exists
  Doctor.findOne({ email })
    .then((foundUser) => {
      // If the doctor with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "Doctor already exists." });
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new doctor in the database
      // We return a pending promise, which allows us to chain another `then`
      return Doctor.create({username, email, photo, price, department, gender, password: hashedPassword,
      });
    })
    .then((createdDoctor) => {
      // Deconstruct the newly created doctor object to omit the password
      // We should never expose passwords publicly
      const { email, _id, role } = createdDoctor;

      // Create a new object that doesn't expose the password
      const user = { email, _id, role };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err));
});

router.get("/doctors", (req, res, next) => {
  // console.log("GET");
  Doctor.find()
    .then((allDoctors) => {
      console.log("ALLDOCTORS", allDoctors);
      res.json(allDoctors);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

router.get("/doctors/:doctorId", (req, res, next) => {
  const { doctorId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Doctor.findById(doctorId)
    .then((oneDoctor) => {
      res.json(oneDoctor);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error, `error finding the doctor`);
    });
});
//1
router.put("/doctors/:doctorId", (req, res, next) => {
  const { doctorId } = req.params;
  // console.log("body", req.body);
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Doctor.findByIdAndUpdate(doctorId, req.body, { new: true })
    .then((updatedDoctors) => res.json(updatedDoctors))
    .catch((error) => res.status(400).json({ message: error }));
});

router.delete("/doctors/:doctorId", async(req, res, next) => {
  const { doctorId } = req.params;
  await Doctor.findByIdAndDelete(doctorId)
  const deletedAppointment= await  Appointment.deleteMany({doctorId:doctorId})
  res.json(deletedAppointment)
});

module.exports = router;