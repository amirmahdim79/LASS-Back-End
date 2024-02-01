const MESSAGES = {
    ALREADY_REGISTERED: 'User is already registered.',
    USER_NOT_FOUND: 'User not found.',
    UNAUTHORIZED: 'Unauthorized action.',
    EMAIL_INCORRECT: 'Incorrect email address.',
    INCORRECT_CODE: 'Incorrect code.',
    FILE_NOT_FOUND: 'File not found.',
    FILE_ALREADY_ADDED: 'File is already added.',
    NO_FILE: 'No file was provided.',
    BAD_FORMAT: 'Bad format.',
    UPLOAD_FAILED: 'Upload failed',
}

const ALLOWED_FORMATS = [
    'image/jpeg',
    'image/png',
    'image/gif'
]

const USER_FIELDS = {
    SIGNUP: [
        'firstName',
        'lastName',
        'email',
        'password',
        'sid',
        'type',
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
        'RecentFiles',
        'smarties',
        'sand',
        'sid',
    ],
    UPDATABLE: [
        'firstName',
        'lastName',
        'profilePicture',
        'type',
        'RecentFiles',
        'sid',
    ],
    REFRENCES: [
        'Labs',
        'Tags',
        'RecentFiles',
    ],
}

module.exports = { 
    MESSAGES, 
    USER_FIELDS,
    ALLOWED_FORMATS,
}