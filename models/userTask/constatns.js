const USER_TASK_FIELDS = {
    CREATE: [
        'name',
        'desc',
        'User',
        'Lab',
        'Event',
        'status',
        'dueDate',
        'File',
        'type',
        'smarties',
    ],
    INFO: [
        'name',
        'desc',
        'User',
        'Lab',
        'Event',
        'status',
        'dueDate',
        'doneDate',
        'File',
        'type',
        'smarties',
        '_id',
    ],
    POPULATE: [
        {
            path: 'File',
        },
    ],
}

const USER_TASK_TYPES = [
    'upload',
    'paper',
]

module.exports = { 
    USER_TASK_FIELDS,
    USER_TASK_TYPES,
}