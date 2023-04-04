const router = require("express").Router();
const Doctor = require("../models/Doctor.model");
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");

router.post("/upload", fileUploader.single("photo"), (req, res, next) => {
  console.log("file is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

router.post("/doctors/add-doctor", (req, res, next) => {
  const { username, email, photo, price, department, gender } = req.body;
  Doctor.create({ username, email, photo, price, department, gender })
    .then((newDoctor) => {
      console.log("new Doctor", newDoctor);
      res.json(newDoctor);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

router.get("/doctors", (req, res, next) => {
  console.log("GET");
  Doctor.find()
    .then((allDoctors) => {
      console.log(allDoctors);
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
  console.log("body", req.body);
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Doctor.findByIdAndUpdate(doctorId, req.body, { new: true })
    .then((updatedDoctors) => res.json(updatedDoctors))
    .catch((error) => res.status(400).json({ message: error }));
});

router.delete("/doctors/:doctorId", (req, res, next) => {
  const { doctorId } = req.params;
  Doctor.findByIdAndDelete(doctorId)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => res.status(400).json({ message: error }));
});

module.exports = router;

/* router.get("/doctors", (req, res, next) => {
  console.log("GET");
  Doctor.find()
    .then((allDoctors) => {
        console.log('All doctor')
      // console.log(allDoctors);
      res.json(allDoctors);
    })
    .catch((error) => console.log(error));
}); */

/* router.get("/doctors/:doctorId", (req, res, next) => {
  const { doctorId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  console.log(doctorId)
  Doctor.findById(doctorId)
    .then((oneDoctor) => {
      console.log(oneDoctor);
      res.json(oneDoctor);
    })
    .catch((err) => {
      console.log(`error finding the doctor`, err);
    });

}); */

/* router.post("/doctors/add-doctor", (req, res, next) => {
  console.log("POST", req.body);
  const { username, email, photo, price, department, gender } = req.body;
  Doctor.create({ username, email, photo, price, department, gender })
    .then((newDoctor) => {
      console.log("new Doctor", newDoctor);
      res.json(newDoctor);
    })
    .catch((error) => res.status(400).json({error}));
});
 */

/* //2
router.put("/doctors/:doctorId", (req, res, next) => {
  const { doctorId } = req.params;
  console.log("body", req.body);
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Doctor.findByIdAndUpdate(doctorId, req.body, { new: true })
    .then((updatedDoctors) => res.json(updatedDoctors))
    .catch((error) => res.status(400).json({ message: error }));
}); */
