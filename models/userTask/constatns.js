const USER_TASK_FIELDS = {
    CREATE: [
        'name',
        'desc',
        'User',
        'Lab',
        'Event',
        'status',
        'dueDate',
        'file',
        'type',
    ],
    INFO: [
        'name',
        'desc',
        'User',
        'Lab',
        'Event',
        'status',
        'dueDate',
        'file',
        'type',
        '_id',
    ],
    POPULATE: [
        // {
        //     path: 'Users',
        //     select: '-password -permissions -RecentFiles -Labs -createdAt -updatedAt',
        // },
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