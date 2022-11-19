const express = require("express");

const {
    login,
    register
} = require("../controllers/user");

const {
    validateLoginRequest,
    isRequestValidated,
    validateRegisterRequest,
} = require("../validators/user");

const router = express.Router();

router.post("/login", validateLoginRequest, isRequestValidated, login);

router.post("/register", validateRegisterRequest, isRequestValidated, register);

module.exports = router;