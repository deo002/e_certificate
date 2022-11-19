const { User } = require('../models/user');

const ADMIN = 'ADMIN';

const requireRoleAdmin = async(req, res, next) => {

    try {
        const user = await User.findById(req.user.id).exec();

        if(user.role === ADMIN) {
            next();
        }
        else {
            return res.status(403).json({
                success: false,
                msg: "Access forbidden"
            });
        }

    } catch(e) {
        console.error(e);
    }
};

module.exports = {
    requireRoleAdmin
};