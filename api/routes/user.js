const express = require("express");

// controller functions
const { loginUser, signupUser, emergencyContact, getEmergencyContacts} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// add / delete emergency contact route
router.post("/contact", emergencyContact);

// get emergency contacts route
router.get("/contacts/:id", getEmergencyContacts)

module.exports = router;
