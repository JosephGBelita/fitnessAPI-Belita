const express = require("express");
const userController = require("../controllers/userControllers");
const router = express.Router();
const { verify, isLoggedIn } = require("../auth");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/details",verify, userController.getUserDetails);

module.exports = router;