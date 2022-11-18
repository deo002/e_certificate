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

router.put("/:id", requireSignin, requireRoleAdmin, addAdmin);

router.post("/", requireSignin, requireRoleAdmin, validateAddStudentsRequest, isRequestValidated, addStudents);

router.post("/student/:id", requireSignin, requireRoleAdmin, validateCertificateRequest, isRequestValidated, addCertificateDetails);

router.delete("/:id", requireSignin, requireRoleAdmin, revokeAdmin);

module.exports = router;