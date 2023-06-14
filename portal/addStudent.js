const express = require('express');
const app = express();
const XLSX = require('xlsx');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const Users = require("../model/users");
const Teacher = require('../model/teacher');
const Course = require('../model/course');
const Student = require('../model/student');
var randomstring = require("randomstring");
const sendMail = require("../controller/sendMail")
const emailTemplate = require('../controller/emailTemplate');
const attandance = require('./attandance');
const courseRoutes = require('./addCourse');
const bcryptjs = require('bcryptjs');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config({ path: ".env" });

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/login');
    }
}

const s3 = new AWS.S3({
    accessKeyId: process.env.AWSKEY,
    secretAccessKey: process.env.AWSPASSWORD,
    region: 'us-west-2'
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'mydbms',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname)
        }
    })
})

// const deleteFile = (fileData) => {
//     const deleteParams = {
//         Bucket: fileData.bucket,
//         Key: fileData.key
//     };

//     s3.deleteObject(deleteParams, function (err, data) {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log('File deleted successfully');
//         }
//     });
// };

app.get('/addCourse', checkAuth, async (req, res) => {
    if (req.user.role == "teacher") {
        let oldteacher = await Teacher.findOne({ email: req.user.email });
        if (oldteacher) {
            res.render('addCourse');
        }
        else {
            req.flash('error_messages', 'Complete Your Profile First');
            res.redirect('/home');
        }
    }
    else {
        req.flash('error_messages', "You have No permission to Add Course");
        res.redirect('/home',);
    }
})

app.post('/uploadStudentsheet', upload.single('file'), async (req, res) => {
    console.log(req.body);
    const filePath = req.file.location;
    const courseCreadit = parseInt(req.body.creadit);
    const courseName = req.body.courseName;
    const attandance_criteria = parseInt(req.body.attandance_criteria);


    const response = await axios.get(filePath, { responseType: 'arraybuffer' }); 
    const fileBuffer = Buffer.from(response.data, 'binary');
    const workbook = XLSX.read(fileBuffer);
    const sheet_name_list = workbook.SheetNames;
    const students = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    const profData = await Teacher.findOne({ email: req.user.email });

    const newCourse = await Course.create({
        name: courseName,
        mentor: profData._id,
        credits: courseCreadit,
        attendanceCriteria: attandance_criteria,
    });

    const teacher = await Teacher.findOneAndUpdate(
        { _id: profData._id },
        { $push: { courses: newCourse._id } },
        { new: true }
    );

    await addStudents(students, newCourse, profData);
    res.json("Student added");
});

async function addStudents(students, newCourse, profData) {
    return new Promise(async (Resolve, Reject) => {
        for (let index = 0; index < students.length; index++) {
            let student = students[index];
            let data = await Users.findOne({ email: student.email });
            if (!data) {
                let newStudentPassword = randomstring.generate(7);
                sendMail.sendNewStudentEnrollmentMsz(student.email, emailTemplate.newUserEmail(newStudentPassword, student.email));
                const salt = bcryptjs.genSaltSync(10);
                newStudentPassword = bcryptjs.hashSync(newStudentPassword, salt);
                let newUser = {
                    "role": "student",
                    "password": newStudentPassword,
                    "email": student.email,
                }
                let studentdata = new Users(newUser);
                studentdata = await studentdata.save();

            }
            let newStudent = await Student.findOne({ email: student.email });
            if (!newStudent) {
                newStudent = await Student.create({
                    name: student.name,
                    rollno: student.rollno,
                    email: student.email,
                    courses: [newCourse._id],
                });
            }
            else {
                newStudent = await Student.findOneAndUpdate(
                    { email: student.email },
                    { $push: { courses: newCourse._id } },
                    { new: true }
                );
            }
            const course = await Course.findOneAndUpdate(
                { _id: newCourse._id },
                { $push: { students: newStudent._id } },
                { new: true }
            );
            await sendMail.sendNewStudentEnrollmentMsz(student.email, emailTemplate.courseRegisterEmail(newCourse.name, profData.name));
        }
        Resolve();
    })
}

app.use(attandance);
app.use(courseRoutes);

module.exports = app;