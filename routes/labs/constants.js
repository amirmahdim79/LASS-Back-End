const MESSAGES = {
    USER_NOT_FOUND: 'Supervisor not found.',
    STUDENT_NOT_FOUND: 'Student not found.',
    NO_ACCESS: 'Access denied',
    ALREADY_REGISTERED: 'Already Exists',
    LAB_NOT_FOUND: 'Lab not found.',
    USER_ALREADY_ENROLLED: 'User already enrolled',
}

const LABS_FIELD = {
    CREATE: [
        'name',
        'email',
        'desc',
    ],
    CREATE_RES: [
        'Supervisor',
        'name',
        'url',
        '_id',
        'desc',
    ],
    INFO: [
        'Supervisor',
        'Students',
        'name',
        'url',
        '_id',
        'desc',
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
                populate: [
                    {
                        path: 'Tasks',
                        populate: {
                            path: 'status',
                        }
                    },
                    {
                        path: 'status',
                    }
                ],
            }
        }
    ],
}

module.exports = { 
    MESSAGES,
    LABS_FIELD,
}