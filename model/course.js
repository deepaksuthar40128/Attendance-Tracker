const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: String,
    mentor: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    credits: Number,
    attendanceCriteria: {
        type: Number,
        default: 75
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

module.exports = mongoose.model('Course', courseSchema);
