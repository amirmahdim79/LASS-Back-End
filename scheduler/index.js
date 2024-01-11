const cron = require('node-cron');

const config = require('config');
const { LOG_ACTIVITY } = require('../utils/snitch');
const { MINUTE_MAN } = require('../utils/minuteMan');

module.exports = () => {
    cron.schedule('0 10 * * *', () => {
        console.log('it works')
        const mailOptions = {
            from: config.get('email_address'),
            to: 'therealamirmahdi79@gmail.com',
            subject: 'Qtopia - Reminder',
            html: `<h1>Drink Water!</h1>`
        };
    
        // transporter.sendMail(mailOptions, function(error, info) {

        // });
    });

    cron.schedule('0 20 * * *', () => {
        LOG_ACTIVITY('SCHEDULER', 'SAND_UPDATE')
        MINUTE_MAN.updateSand()
    });
}