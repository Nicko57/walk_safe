const express = require("express");

// controller functions
const { loginUser, signupUser, emergencyContact } = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// add / delete emergency contact route
router.post("/contact", emergencyContact);

module.exports = router;
