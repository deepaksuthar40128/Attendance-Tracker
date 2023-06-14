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
const bcryptjs = require('bcryptjs');
const Attendance = require('../model/Attandance');
const { default: mongoose } = require('mongoose');

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/login');
    }
}
app.get('/courseReview/:id', checkAuth, async (req, res) => {
    if (req.user.role == "teacher") {
        let course_id = req.params.id;
        const profData = await Teacher.findOne({ email: req.user.email });
        if (profData.courses.includes(course_id)) {
            res.render('courseReview', { course_id, courseName: data.name });
        }
        else {
            req.flash('error_messages', "You have No permission to this Course");
            res.redirect('/home',);
        }
    }
    else {
        req.flash('error_messages', "You have No permission to this Page");
        res.redirect('/home',);
    }
})


app.get('/takeAttandance/:id', checkAuth, async (req, res) => {
    if (req.user.role == "teacher") {
        let course_id = req.params.id;
        const profData = await Teacher.findOne({ email: req.user.email });
        if (profData.courses.includes(course_id)) {
            let targetDate = new Date();
            console.log(targetDate)
            let pattandance = await Attendance.aggregate([
                {
                    $match: {
                        course_id: mongoose.Types.ObjectId(course_id),
                        date: {
                            $gte: new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()),
                            $lt: new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1)
                        }
                    }
                }
            ]).exec();
            if (pattandance.length == 0)
                res.render('takeAttandance', { course_id, courseName: data.name, date: `${targetDate.getDate()}-${targetDate.getMonth() + 1}-${targetDate.getFullYear()}` });
            else {
                req.flash('error_messages', "Today Attandance is already taken for this subject");
                res.redirect('/home',);
            }
        }
        else {
            req.flash('error_messages', "You have No permission to this Course");
            res.redirect('/home',);
        }
    }
    else {
        req.flash('error_messages', "You have No permission to this Page");
        res.redirect('/home',);
    }
})

app.post('/loadAttandance', checkAuth, async (req, res) => {
    await (new Attendance({
        course_id: req.body.courseId,
        date: new Date(),
        attendance: req.body.AttandanceData,
    })).save();
    res.json({ success: true });
})

module.exports = app; 