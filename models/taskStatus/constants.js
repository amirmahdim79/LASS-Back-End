const TASK_STATUS_FIELDS = {
    CREATE: [
        'Task',
        'User',
        'Data'
    ],
    INFO: [
        'Task',
        'User',
        'Data',
        'Status',
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