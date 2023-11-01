const cron = require('node-cron');

const config = require('config')
const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: config.get('email_service'),
//     auth: {
//         user: config.get('email_address'),
//         pass: config.get('email_password')
//     }
// })

module.exports = () => {
    // cron.schedule('0 10 * * *', () => {
    //     console.log('it works')
    //     const mailOptions = {
    //         from: config.get('email_address'),
    //         to: 'therealamirmahdi79@gmail.com',
    //         subject: 'Qtopia - Reminder',
    //         html: `<h1>Drink Water!</h1>`
    //     };
    
    //     transporter.sendMail(mailOptions, function(error, info) {

    //     });
    // });
}