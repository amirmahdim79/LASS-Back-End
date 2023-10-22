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
        '_id',
    ],
    INFO: [
        'Supervisor',
        'Students',
        'name',
        'url',
        '_id',
    ],
    POPULATE: [
        {
            path: 'Students',
            select: '-password',
        },
        {
            path: 'Supervisor',
            select: '-password',
        },
        {
            path: 'Paths',
            populate: {
                path: 'Milestones',
                populate: {
                    path: 'Tasks',
                }
            }
        }
    ],
}

module.exports = { 
    MESSAGES,
    LABS_FIELD,
}