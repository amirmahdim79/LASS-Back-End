const MESSAGES = {
    USER_NOT_FOUND: 'Supervisor not found.',
    NO_ACCESS: 'Access denied',
    ALREADY_REGISTERED: 'Already Exists',
    LAB_NOT_FOUND: 'Lab not found.',
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