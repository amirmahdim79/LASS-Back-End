const MESSAGES = {
    PATH_NOT_FOUND: 'Path not found.',
    MILESTONE_NOT_FOUND: 'Milestone not found.',
    LAB_NOT_FOUND: 'Lab not found.',
    NO_ACCESS: 'Access denied',
    ALREADY_REGISTERED: 'Already Exists',
    LAB_NOT_FOUND: 'Lab not found.',
}

const TASK_FIELDS = {
    CREATE: [
        'type',
        'interval',
        'activity',
        'name',
        'desc',
    ],
    CREATE_RES: [
        'Milestone',
        'type',
        'interval',
        'activity',
        'name',
        'desc',
        'status',
        '_id',
    ],
    INFO: [
        'Milestone',
        'type',
        'interval',
        'activity',
        'name',
        'desc',
        'status',
        '_id',
    ],
    POPULATE: [
    ],
}

module.exports = { 
    MESSAGES,
    TASK_FIELDS,
}