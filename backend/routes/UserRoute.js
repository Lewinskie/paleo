const router = require("express").Router();
const userController = require("../controllers/UserController");

router.post("/users/signup", userController.signup);
router.post("/users/signin", userController.signin);

module.exports = router;
