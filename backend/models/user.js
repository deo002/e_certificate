const mongoose = require('mongoose');
const { Schema } = mongoose;
const { hashPassword } = require('../services/bcrypt.service');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The field "name" must have a value']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The field "email" must have a value'],
        validate: {
            validator: function(v) {
              return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
            },
            message: props => `${props.value} is not a email`
        }
    },
    password: {
        type: String,
        required: [true, 'The field "password" must have a value']
    },
    role: {
        type: String,
        enum: {
            values: ['ADMIN', 'BASIC'],
            message: '{VALUE} is not supported'
        },
        required: [true, 'The field "role" must have a value']
    }
}, { timestamps: true });

userSchema.pre('save', async function() {    
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    user.password = await hashPassword(user.password);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};