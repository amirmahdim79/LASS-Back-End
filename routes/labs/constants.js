const MESSAGES = {
    USER_NOT_FOUND: 'Supervisor not found.',
    NO_ACCESS: 'Access denied',
    ALREADY_REGISTERED: 'Already Exists',
}

const LABS_FIELD = {
    CREATE: [
        'name',
        'email',
    ],
    CREATE_RES: [
        'Supervisor',
        'name',
        'url',
    ]
}

module.exports = { 
    MESSAGES,
    LABS_FIELD,
}