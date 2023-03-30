const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: String,
    profile: String,
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    email: String
});

module.exports = mongoose.model('Teacher', teacherSchema);
