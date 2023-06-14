const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: String,
    rollno: String,
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    profile: String,
    email: String
});

module.exports = mongoose.model('Student', studentSchema);
