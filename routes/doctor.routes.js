const router = require('express').Router()
const Doctor = require("../models/Doctor.model")
const mongoose = require('mongoose')

router.post('/doctors/add-doctor', (req,res,next)=> {
    console.log("POST", req.body)
    const { username, email, photo, price, department, gender } = req.body
    Doctor.create({username, email, photo, price, department, gender})
    .then(newDoctor=>{
        console.log("new Doctor", newDoctor);
        res.json(newDoctor)
    })
    .catch(error=>console.log(error))
})

router.get("/doctors",(req,res,next)=>{
    console.log("GET")
    Doctor.find()
    .then(allDoctors=>{
        console.log(allDoctors);
        res.json(allDoctors)
    })
    .catch(error=>console.log(error))
})

router.get("/doctors/:doctorId", (req,res,next) => {
    const { doctorId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        res.status(400).json( {message: "Specified id is not valid"});
        return;
    }
    Doctor.findById(doctorId)
    .then(oneDoctor=>{
        console.log(oneDoctor)
        res.json(oneDoctor)
    })
})

router.put("/doctors/:doctorId", (req,res,next) => {
    const { doctorId } = req.params;
    console.log ("body", req.body)
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        res.status(400).json( {message: "Specified id is not valid"});
        return;
    }
    Doctor.findByIdAndUpdate(doctorId, req.body,{new:true})
        .then((updatedDoctors) => res.json(updatedDoctors))
        .catch(error=>res.status(400).json( {message: error}))
});

router.delete("/doctors/:doctorId",(req,res,next)=>{
    const {doctorId} = req.params;
    Doctor.findByIdAndDelete(doctorId)
    .then((response)=>{
        res.json(response)
    })
    .catch(error=>res.status(400).json( {message: error}))
})

module.exports = router;