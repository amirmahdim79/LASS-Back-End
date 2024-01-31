const TASK_STATUS_FIELDS = {
    CREATE: [
        'Task',
        'User',
        'File',
    ],
    INFO: [
        'Task',
        'User',
        'Status',
        'doneDate',
        'File',
        '_id',
    ],
    POPULATE: [
        {
            path: 'Milestone',
        },
        {
            path: 'File',
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