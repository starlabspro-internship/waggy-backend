const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// create a user router
router.post("/user", userController.createUser);
// get all users router
router.get("/user", userController.getAllUsers);
// get one user by ID router
router.get("/user/:id", userController.getUserById);
// update one user by ID router
router.put("/:id", userController.updateUser);
// delete one user by ID router
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
