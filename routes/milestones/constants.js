const MESSAGES = {
    PATH_NOT_FOUND: 'Path not found.',
    LAB_NOT_FOUND: 'Lab not found.',
    NO_ACCESS: 'Access denied',
    ALREADY_REGISTERED: 'Already Exists',
    LAB_NOT_FOUND: 'Lab not found.',
    MILESTONE_NOT_FOUND: 'Milestone not found.',
}

const MILESTONES_FIELD = {
    CREATE: [
        'name',
        'desc',
        'sandGain',
    ],
    CREATE_RES: [
        'Path',
        'name',
        'url',
        'desc',
        'status',
        '_id',
    ],
    INFO: [
        'Path',
        'Tasks',
        'name',
        'url',
        'desc',
        'status',
        '_id',
    ],
    POPULATE: [
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

module.exports = { 
    MESSAGES,
    MILESTONES_FIELD,
}