const nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "deepaksuthar40128@gmail.com",
        pass: "xdenmwfnwwiqgety",
    },
});

module.exports.sendResetEmail = async (email, token) => {
    // change first part to your domain
    var url = "http://localhost/user/reset-password?token=" + token;

    await smtpTransport.sendMail({
        from: "Take Notes",
        to: email,
        subject: "RESET YOUR PASSWORD",
        text: `Click on this link to reset your password ${url}`,
        html: `<h3> Click on this link to reset your password : ${url} </h3>`,
    });
};

module.exports.sendVerifyEmail = async (email, token) => {
    // change first part to your domain
    var url = "http://localhost/verifyemail?token=" + token;

    await smtpTransport.sendMail({
        from: "Take Notes",
        to: email,
        subject: "VERIFY Your EMAIL",
        text: `Click on this link to verify ${url}`,
        html: `<h3> Click on this link to verify your email : ${url} </h3>`,
    });
};

module.exports.sendNewStudentEnrollmentMsz = (email, text) => {
    return new Promise(async (Resolve, Reject) => {
        await smtpTransport.sendMail({
            from: "Attandance Tracker",
            to: email,
            subject: "Hey You Are Now a Member of Attandance Tracker",
            text: `Hii, There...`,
            html: text,
        });
        Resolve();
    })
}