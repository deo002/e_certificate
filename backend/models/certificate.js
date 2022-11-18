const mongoose = require('mongoose');
const { Schema } = mongoose;

const certificateSchema = new Schema({
    url: {
        type: String,
        required: [true, 'The field "url" must have a value']
    },
    student: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    type: {
        type: String,
        enum: {
            values: ['GRADUATION'],
            message: '{VALUE} is not supported'
        },
        required: [true, 'The field "type" must have a value']
    }
}, { timestamps: true });

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = {
    Certificate
};