const express = require("express");
const router = express.Router();
const controller = require('../controller/user')

router.put("/signup", controller.createUser);

router.put("/login", controller.loginUser);

module.exports = router;
