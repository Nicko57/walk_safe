const express = require("express");

// controller functions
const { loginUser, signupUser, updateUser, deleteUser, getUser } = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// findUser route
router.patch("/:id", updateUser);

// deleteUser route
router.delete("/:id", deleteUser);

// getUser route
router.get("/:id", getUser);

module.exports = router;
