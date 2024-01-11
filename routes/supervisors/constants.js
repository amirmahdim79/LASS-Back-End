const MESSAGES = {
    ALREADY_REGISTERED: 'Supervisor is already registered.',
    USER_NOT_FOUND: 'User not found.',
    UNAUTHORIZED: 'Unauthorized action.',
    EMAIL_INCORRECT: 'Incorrect email address.',
    INCORRECT_CODE: 'Incorrect code.',
    FILE_NOT_FOUND: 'File not found.',
    FILE_ALREADY_ADDED: 'File is already added.',
    NO_PERMISSION_GIVEN: 'No permission is given in the request.',
    PERMISSION_ADDED: 'Permission added.',
}

const ALLOWED_FORMATS = [
    'image/jpeg',
    'image/png',
    'image/gif'
]

const SUPS_FIELDS = {
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
        'RecentFiles',
    ],
    UPDATABLE: [
        'firstName',
        'lastName',
        'username',
        'phonenumber',
        'profilePicture',
        'RecentFiles',
    ]
}

module.exports = { 
    MESSAGES, 
    SUPS_FIELDS,
    ALLOWED_FORMATS,
}