const { check, validationResult } = require('express-validator');

const validateRegisterRequest = [
    check("email")
    .notEmpty().
    withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Invalid email"),
    check("password")
    .notEmpty()
    .withMessage("Password must not be empty")
    .isLength({ min: 8 })
    .withMessage("Password must contain atleast 8 characters")
    .isLength({ max: 100 })
    .withMessage("Password can contain at max 100 characters"),
    check("name")
    .notEmpty()
    .withMessage("Name must not be empty")
    .isLength({ min: 3 })
    .withMessage("Password must contain atleast 3 characters")
];

const validateLoginRequest = [
    check("email")
    .notEmpty().
    withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Invalid email"),
    check("password")
    .notEmpty()
    .withMessage("Password must not be empty")
    .isLength({ min: 8 })
    .withMessage("Password must contain atleast 8 characters")
    .isLength({ max: 100 })
    .withMessage("Password can contain at max 100 characters")
];

const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ msg: errors.array()[0].msg });
    }
    next();
};

module.exports = {
    validateRegisterRequest,
    validateLoginRequest,
    isRequestValidated
};