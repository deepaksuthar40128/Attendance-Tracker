const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const Notes = require('../model/notes');
const Users = require('../model/user');
const Remainder = require('../model/remainder');
const timeago = require('timeago.js');
const mailer = require('./sendMail');
const schedule = require('node-schedule');

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/login');
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

app.post('/save-img', upload.single('image'), (req, res) => {
    res.status(200).send({ link: `uploads/${req.file.filename}` });
});

var Sentiment = require('sentiment');
var sentiment = new Sentiment();


app.post('/saveNote', async (req, res) => {
    var result = sentiment.analyze(req.body.topic);
    console.log(result);
    data = new Notes({
        email: req.user.email,
        topic: req.body.topic,
        note: req.body.note,
        isCompleted: false,
        // sentiment: analyzer.getSentiment(req.body.note),
    })
    data = await data.save();
    res.status(200).send(data);
});

app.post('/update/:id', async (req, res) => {
    await Notes.findByIdAndUpdate(req.params.id, req.body);
    res.send("updated");
})

app.get('/note/:id', checkAuth, async (req, res) => {
    const note_data = await Notes.findById(req.params.id);
    const updatedNote = {
        ...note_data.toObject(),
        createdAt: timeago.format(note_data.createdAt),
    };
    res.send(updatedNote);
});



app.get('/allNotes', checkAuth, async (req, res) => {
    let email = req.user.email;
    let order = parseInt(req.query.order);
    let show_status = parseInt(req.query.status); let ids;
    if (show_status == 2) {
        ids = await Notes.aggregate([
            {
                '$match': {
                    'email': email
                }
            }, {
                '$project': {
                    'createdAt': 1
                }
            }, {
                '$sort': {
                    'createdAt': order
                }
            }
        ]).exec();
    }
    else {
        ids = await Notes.aggregate([
            {
                '$match': {
                    'email': email,
                    'isCompleted': (show_status == 1 ? true : false),
                }
            }, {
                '$project': {
                    'createdAt': 1
                }
            }, {
                '$sort': {
                    'createdAt': order
                }
            }
        ]).exec();
    }
    res.send(ids);
})
app.get('/details/:id', checkAuth, async (req, res) => {
    note_data = await Notes.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
        {
            $project: {
                createdAt: 1,
                updatedAt: 1,
                isCompleted: 1,
                email: 1
            }
        }
    ]);
    note_data = note_data[0];
    note_data['username'] = req.user.username;
    note_data['userId'] = req.user._id;
    note_data.createdAt = timeago.format(note_data.createdAt);
    note_data.updatedAt = timeago.format(note_data.updatedAt);
    res.send(note_data);
});

app.get('/delete/:id', checkAuth, async (req, res) => {
    try {
        const deletedNote = await Notes.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).send("Note not found");
        }
        res.send("Note Deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

app.get('/remainder/:id', checkAuth, async (req, res) => {
    const noteId = req.params.id;
    const reminderDate = parseInt(req.query.time);

    const reminder = new Remainder({
        noteId: noteId,
        time: reminderDate,
        action: 'email'
    });
    await reminder.save();
    schedule.scheduleJob(reminderDate, async () => {
        const note = await Notes.findById(noteId);
        await Remainder.deleteOne({ _id: reminder._id });
        note_data = await create_note(note.note, noteId);
        mailer.sendReminderEmail(note.email, note_data);
    });

    res.send(reminder);
});

async function create_note(text, noteId) {
    return new Promise((Resolve, Reject) => {
        data = `<div >
<div style="margin:20px">
${text}
<div style='display: flex;
    flex-wrap: wrap;'>

<a style="text-decoration:none;border:1px solid black;padding:5px;color:black;margin:5px;cursor:pointer;border-radius:5px;" href='http://localhost/mark/complete/${noteId}'>Mark as Completed</a>
<a style="text-decoration:none;border:1px solid black;padding:5px;color:black;margin:5px;cursor:pointer;border-radius:5px;" href='http://localhost/'>View Notes</a>
<a style="text-decoration:none;border:1px solid black;padding:5px;color:black;margin:5px;cursor:pointer;border-radius:5px;" href='http://localhost/'>Delete Note</a>
<a style="text-decoration:none;border:1px solid black;padding:5px;color:black;margin:5px;cursor:pointer;border-radius:5px;" href='http://localhost/'>Schedule for 10 days</a>
</div>
</div>`
        return Resolve(data);
    })
}


app.get('/userProfile', checkAuth, async (req, res) => {
    const email = req.user.email;
    console.log(req.user)
    const totalNotes = await Notes.countDocuments({ email: email });
    const data = {
        ...req.user.toObject(),
        count: totalNotes,
    };
    console.log(data);
    res.send(data);
});

app.get('/mark/complete/:id', async (req, res) => {
    await Notes.findByIdAndUpdate(req.params.id, { isCompleted: true });
    res.send("updated");
})

app.get('/delete_user', async (req, res) => {
    await Notes.deleteMany({ email: req.user.email });
    await Users.deleteOne({ email: req.user.email });
    res.redirect('/logout');
})

module.exports = app;