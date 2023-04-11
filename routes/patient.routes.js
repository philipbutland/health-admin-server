const router = require("express").Router();
const Patient = require("../models/Patient.model");
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");
const bcrypt = require("bcrypt");
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

router.post("/patients/add-patient", (req, res, next) => {
  const { username, email, password, photo, dob, gender, bloodType } = req.body;

  console.log("req.body", req.body)

  let role = "patient";

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email, password" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  console.log("&&&&&& email ", email, emailRegex)

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




//   Patient.create({ username, email, password, photo, dob, gender, bloodType })
//     .then((newPatient) => {
//       // console.log("new Patient", newPatient);
//       res.json(newPatient);
//     })
//     .catch((error) => {
//       if (error.code === 11000) {
//         res
//           .status(400).json({message: "This user name is already being used. Please use a different name",
//           });
//       }
//     });
// });

router.get("/patients", (req, res, next) => {
  // console.log("GET");
  Patient.find()
    .then((allPatients) => {
      res.json(allPatients);
      console.log("ALLPATIENTS", allPatients)
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
      // console.log(onePatient);
      res.json(onePatient);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});


router.put("/patients/:patientId", (req, res, next) => {
  const { patientId } = req.params;
  // console.log("body", req.body);
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Patient.findByIdAndUpdate(patientId, req.body, { new: true })
    .then((updatedPatients) => res.json(updatedPatients))
    .catch((error) => res.status(400).json({ message: error }));
});



router.delete("/patients/:patientId", (req, res, next) => {
  const { patientId } = req.params;
  Patient.findByIdAndDelete(patientId)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => res.status(400).json({ message: error }));
});

module.exports = router;
