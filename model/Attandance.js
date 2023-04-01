const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    date: Date,
    attendance: [{
        student_id: {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        },
        isPresent: Boolean
    }]
});

module.exports = mongoose.model('Attendance', attendanceSchema);
