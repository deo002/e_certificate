const { User } = require('../models/user');
const { hashPassword } = require('../services/bcrypt.service');
    

const addAdmin = async(req, res) => {
    try {
        const { email } = req.body;
        const r = await User.findOneAndUpdate({ email }, { $set: { role: 'ADMIN' }}, { new: true }).exec();
        const user = {
            name: r.name,
            email: r.email,
            role: r.role,
            id: r._id.toString()
        };
        res.status(200).json({
            success: true,
            user
        });
    } catch(e) {
        console.error(e);
        res.status(400).json({
            success: false,
            msg: e
        });
    }
};

const revokeAdmin = async(req, res) => {
    try {
        const { email } = req.body;
        const r = await User.findOneAndUpdate({ email }, { $set: { role: 'BASIC' }}, { new: true }).exec();
        const user = {
            name: r.name,
            email: r.email,
            role: r.role,
            id: r._id.toString()
        };
        res.status(200).json({
            success: true,
            user
        });
    } catch(e) {
        console.error(e);
        res.status(400).json({
            success: false,
            msg: e
        });
    }
};

const getAdmins = async(req, res) => {
    try {
        const r = await User.find({ role: 'ADMIN' }).exec();
        console.log(r);
        const users = [];
        for(let user of r) {
            users.push({
                name: user.name,
                email: user.email,
                role: user.role,
                id: user._id
            });
        }
        res.status(200).json({
            success: true,
            users,
            msg: "Admins fetched successfully"
        });
    } catch(e) {
        console.error(e);
        res.status(400).json({
            success: false,
            msg: e
        });
    }
};

const addStudents = async(req, res) => {
    try {
        const { users } = req.body;
        for(let user of users) {
            user.role = 'BASIC';
            user.password = await hashPassword(user.password);
        }

        const students = await User.insertMany(users);

        res.status(200).json({
            success: true,
            users: students,
            msg: "Students added successfully to the database"
        });
    } catch(e) {
        console.error(e);
        res.status(400).json({
            success: false,
            msg: e
        });
    }
};

const addCertificateDetails = async(req, res) => {
    try {
        const {
            fname,
            lname,
            roll,
            yop,
            cgpa,
            college,
        } = req.body;
         console.log(fname, lname, roll, yop, cgpa, college);

        


        res.status(200).json({
            success: true,
            msg: "Certificate added to blockchain successfully"
        });

    } catch(e) {
        console.error(e);
        res.status(400).json({
            success: false,
            msg: e
        });
    }
};

module.exports = {
    addAdmin,
    revokeAdmin,
    getAdmins,
    addStudents,
    addCertificateDetails
};