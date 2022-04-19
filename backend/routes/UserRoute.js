const router = require("express").Router();
const userController = require("../controllers/UserController");

router.route("/users").post(userController.createUser);

module.exports = router;
