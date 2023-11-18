const MESSAGES = {
    INVALID_PARAMS: 'Invalid email or password.',
}

const FIELDS = {
    AUTH_RETURN: [
        '_id',
        'firstName',
        'lastName',
        'email',
        'phonenumber',
        'url',
        'profilePicture',
        'permissions',
    ]
}

module.exports = { 
    MESSAGES,
    FIELDS
}