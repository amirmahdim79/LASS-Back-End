const TEMPLATES = {
    LAB_WELCOME: {
        SUBJECT: 'Welcome to ILAB',
        CONTENT: `Dear *name*, welcome to *lab_name*! we hope you have a great journey ahead of you. Best, LASS team.`,
        KEYS: [
            'name',
            'lab_name',
        ]
    },
    FORUM_MENTION: {
        SUBJECT: 'New forum mention',
        CONTENT: `You have a new message from *name*: *text*`,
        KEYS: [
            'name',
            'text',
        ]
    },
    EVENT_CREATION: {
        SUBJECT: 'New events',
        CONTENT: `You are added to new events. Login to see your calendar.`,
        KEYS: []
    },
    
    
}

const EMAIL_TEMPLATE_NAMES = {
    LAB_WELCOME: 'LAB_WELCOME',
}

const REPLACER = (content, keys) => {
    const regex = /\*([^*]+)\*/g;

    const replacedString = content.replace(regex, (match, keyword) => {
        if (keys[keyword]) {
            return keys[keyword];
        } else {
            return match;
        }
    })

    return replacedString
}

module.exports = {
    EMAIL_TEMPLATE_NAMES,
    TEMPLATES,
    REPLACER,
}