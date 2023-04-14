
# Health Admin

## Description

​Platform linking patients with doctors, and helping them make and change appointments

## Features

* Signup as a new user
* Log in as Admin and create, edit and delete Doctors, Patients, and Appointments
* Login as Patient and add/change your username, email, photo, date of birth, gender, and blood type
* Login as Doctor and add/change your username, email, photo, price, department, and gender
* Login as Patient or Doctor and view or edit your public profile
* Login as Patient and view the public profile of doctors with whom you have an appointment
* Login as Patient or Doctor and view and edit your Appointments
* Link to the home page which displays the number of doctors and patients currently in the system

## MIDDLEWARE: (in /middleware)

* jwt.middleware.js - JWT token validation middleware

## MODELS (in /models)

* Admin.model.js - model for Admins containing email, password and username
* Appointment.model.js - model for Appointments containing doctorId, doctorName, patientId, dateTime, anddepartment
* Doctor.model.js - model for Doctors containing username, email, password, photo, price, department, and gender
* Patient.model.js - model for Patients containing username, email, password, photo, dob, gender, bloodType, and appointment

## ROUTES (in /routes)

* Appointment routes in appointment.routes.js
    * POST /appointments/add-appointment
        * Posts the information for a new appointment
    * GET /appointments
        * Gets all current appointments
    * GET /appointments/:appointmentId
        * validates :appointmentId then gets information for this appointment
    * PUT /appointments/:appointmentId
        * validates :appointmentId then posts information for this appointment
    * GET /appointments/patients/:patientId"
        * gets the appointments corresponding to patient :patientId
    * GET /appointments/doctors/:doctorId
        * gets the appointments corresponding to doctor :doctorId
    * DELETE /appointments/:appointmentId
        * validates :appointmentId then deletes this appointment

* auth.routes in auth.routes.js

    * POST /signup
        * validates email, password and username and encrypts the password as new variable hashedPassword
    * POST /login
        * validates and checks email and password against existing Patients, Doctors and Admins. 
        * If a match is found, sets authToken and role (patient, doctor, or admin)
    * GET /verify
        * verifies the JWT token

* Doctor routes in doctor.routes.js
    * POST /upload
        * validates a picture and uploads if valid
    * POST /doctors/add-doctor
        Validates username and password for new doctor and xreates doctor if everything is valid
    * GET /doctors
        Gets all current doctors
    * GET /doctors/:doctorId
        validates :doctorId then gets information for this doctor
    * PUT /doctors/:doctorId
        validates :doctorId then posts information for this doctor
    * DELETE /doctors/:doctorId
        validates :doctorId then deletes this doctor

* Index routes in index.routes.js
    * GET /
      * Renders the home page

* Patient routes in patient.routes.js
    * POST /upload
        * validates a picture and uploads if valid
    * POST /patients/add-patient
        Validates username and password for new patient and xreates doctor if everything is valid
    * GET /patients
        Gets all current patients
    * GET /patients/:patientId
        validates :patientId then gets information for this patient
    * PUT /patients/:patientId
        validates :patientId then posts information for this patient
    * DELETE /patients/:patientId
        validates :patientId then deletes this patient



Miro https://miro.com/app/board/uXjVMcWdAuU=/
Github https://github.com/philipbutland/health-admin-client
Presentation https://docs.google.com/presentation/d/1DaUd0SUFgsfSXEORaM57-M0A0etiBNJMifn9MpsDFPo/edit#slide=id.p