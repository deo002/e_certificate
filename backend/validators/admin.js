const { check, validationResult } = require('express-validator');

const validateCertificateRequest = [

];

const validateAddStudentsRequest = [

];

const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ msg: errors.array()[0].msg });
    }
    next();
};

module.exports = {
    validateCertificateRequest,
    validateAddStudentsRequest,
    isRequestValidated
};