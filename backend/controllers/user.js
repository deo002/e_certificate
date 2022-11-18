const { User } = require('../models/user');
const jwt = require("jsonwebtoken");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

const login = async(req, res) => {
    try {
        const {
            email,
            password
        } = req.body;



    } catch(e) {
        console.error(e);
        res.status(400).json({
            success: false,
            msg: e
        });
    }
};

const register = async(req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        const user = await User.create({ 
            name,
            email,
            password
        });

        const token = jwt.sign(
            {
                user
            },
            JWT_AUTH_TOKEN,
            {
                expiresIn: "90d",
            }
        );

        res.status(200).json({
            success: true,
            msg: "Registered successfully!",
            user,
            token
        });

    } catch(e) {
        console.error(e);
        res.status(400).json({
            success: false,
            msg: e
        });
    }
};

modeule.exports = {
    login, 
    register
};