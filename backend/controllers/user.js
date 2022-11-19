const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../services/bcrypt.service');

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

const login = async(req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        let user = await User.findOne({ email }).exec();

        const result = await comparePassword(password, user.password);
        if (!result) {
            throw new Error("Invalid email or password");
        }

        const _user = {
            email,
            id: user._id
        };

        const token = jwt.sign(
            {
                user: _user
            },
            JWT_AUTH_TOKEN,
            {
                expiresIn: "90d",
            }
        );

        const __user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.status(200).json({
            success: true,
            msg: "Logged in successfully",
            user: __user,
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

const register = async(req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        const role = 'BASIC';

        const user = await User.create({ 
            name,
            email,
            password,
            role
        });

        const _user = {
            email,
            id: user._id
        };

        const token = jwt.sign(
            {
                user: _user
            },
            JWT_AUTH_TOKEN,
            {
                expiresIn: "90d",
            }
        );

        const __user = {
            id: user._id,
            name,
            email,
            role
        };

        res.status(200).json({
            success: true,
            msg: "Registered successfully",
            user: __user,
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

module.exports = {
    login, 
    register
};