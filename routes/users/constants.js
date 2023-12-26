const MESSAGES = {
    ALREADY_REGISTERED: 'User is already registered.',
    USER_NOT_FOUND: 'User not found.',
    UNAUTHORIZED: 'Unauthorized action.',
    EMAIL_INCORRECT: 'Incorrect email address.',
    INCORRECT_CODE: 'Incorrect code.',
    FILE_NOT_FOUND: 'File not found.',
    FILE_ALREADY_ADDED: 'File is already added.',
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
        'type',
        'Tags',
        'Labs',
        'permissions',
        'Recent_files',
    ],
    UPDATABLE: [
        'firstName',
        'lastName',
        'profilePicture',
        'type',
        'Recent_files',
    ],
    REFRENCES: [
        'Labs',
        'Tags',
        'Recent_files',
    ],
}

module.exports = { 
    MESSAGES, 
    USER_FIELDS,
}