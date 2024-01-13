const TASK_STATUS_FIELDS = {
    CREATE: [
        'Task',
        'User',
        'data'
    ],
    INFO: [
        'Task',
        'User',
        'data',
        'Status',
        'doneDate',
        '_id',
    ],
    POPULATE: [
        {
            path: 'Milestone',
        },
        {
            path: 'User',
            select: '-password',
        },
    ],
}

module.exports = { 
    TASK_STATUS_FIELDS
}