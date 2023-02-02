const express = require("express");

// controller functions
const { loginUser, signupUser, addEmergencyContact } = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// add emergency contact route
router.post("/add", addEmergencyContact);

module.exports = router;
