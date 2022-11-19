const express = require("express");

const {
    addAdmin,
    revokeAdmin,
    getAdmins,
    addCertificateDetails,
    addStudents
} = require("../controllers/admin");

const { requireSignin } = require("../services/auth.service");
const { requireRoleAdmin } = require("../permissions/admin");

const {
    validateCertificateRequest,
    validateAddStudentsRequest,
    isRequestValidated
} = require("../validators/admin");

const router = express.Router();


router.get("/", requireSignin, requireRoleAdmin, getAdmins);

router.put("/add", requireSignin, requireRoleAdmin, addAdmin);

router.post("/students", validateAddStudentsRequest, isRequestValidated, requireSignin, requireRoleAdmin, addStudents);

router.post("/student", validateCertificateRequest, isRequestValidated, requireSignin, requireRoleAdmin, addCertificateDetails);

router.put("/revoke", requireSignin, requireRoleAdmin, revokeAdmin);

module.exports = router;