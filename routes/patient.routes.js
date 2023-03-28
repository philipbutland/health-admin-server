const router = require('express').Router()
const Patient = require("../models/Patient.model")
const mongoose = require('mongoose')


router.post('/patients/add-patient', (req,res,next)=> {
    console.log("req.body ", req.body)
    const { username, email, photo, dob, gender, bloodType } = req.body
    
    Patient.create({username, email, photo, dob, gender, bloodType})
    .then(newPatient=>{
        console.log("new Patient", newPatient)
        res.json(newPatient)
    })
    .catch(error=>{
        if (error.code === 11000){
            res.status(400).json( {message: "This user name is already being used. Please use a different name"})
        }
    })
})

router.get("/patients",(req,res,next)=>{
    console.log("GET")
    Patient.find()
    .then(allPatients=>{
        res.json(allPatients)
    })
    .catch(error=>{
        console.log(error)
        res.status(400).json(error)
    })
})

router.get("/patients/:patientId", (req,res,next) => {
    const { patientId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        res.status(400).json( {message: "Specified id is not valid"});
        return;
    }
    Patient.findById(patientId)
    .then(onePatient=>{
        console.log(onePatient)
        res.json(onePatient)
    })
    .catch(error=>{
        console.log(error)
        res.status(400).json(error)
    })
})

router.put("/patients/:patientId", (req,res,next) => {
    const { patientId } = req.params;
    console.log ("body", req.body)
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        res.status(400).json( {message: "Specified id is not valid"});
        return;
    }
    Patient.findByIdAndUpdate(patientId, req.body,{new:true})
        .then((updatedPatients) => res.json(updatedPatients))
        .catch(error=>res.status(400).json( {message: error}))
});

router.delete("/patients/:patientId",(req,res,next)=>{
    const {patientId} = req.params;
    Patient.findByIdAndDelete(patientId)
    .then((response)=>{
        res.json(response)
    })
    .catch(error=>res.status(400).json( {message: error}))
})

module.exports = router;