const FORUM_FIELDS = {
    CREATE: [
        'name',
        'desc',
        'User',
        'Lab',
        'Event',
        'status',
        'dueDate',
        'file',
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
        '_id',
    ],
    POPULATE: [
        // {
        //     path: 'Users',
        //     select: '-password -permissions -RecentFiles -Labs -createdAt -updatedAt',
        // },
    ],
}

module.exports = { 
    FORUM_FIELDS
}