const router = require("express").Router();
const userController = require("../controllers/UserController");

router.post("/users", userController.createUser);
router.post("/users/signin", userController.signin);

module.exports = router;
