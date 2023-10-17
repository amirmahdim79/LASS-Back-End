const MESSAGES = {
    ALREADY_REGISTERED: 'User is already registered.',
    USER_NOT_FOUND: 'User not found.',
    UNAUTHORIZED: 'Unauthorized action.',
    EMAIL_INCORRECT: 'Incorrect email address.',
    INCORRECT_CODE: 'Incorrect code.'
}

const USER_FIELDS = {
    SIGNUP: [
        'firstName',
        'lastName',
        'email',
        'password',
    ],
    INFO: [
        '_id',
        'firstName',
        'lastName',
        'email',
        'url',
        'profilePicture',        
    ],
    UPDATABLE: [
        'firstName',
        'lastName',
        'profilePicture',
    ]
}

module.exports = { 
    MESSAGES, 
    USER_FIELDS,
}