const REPORT_FIELDS = {
    CREATE: [
        'Lab',
        'Task',
        'User',
        'activity',
        'Files',
    ],
    INFO: [
        'Lab',
        'Task',
        'User',
        'activity',
        'Files',
        '_id',
    ],
    POPULATE: [
        {
            path: 'User',
            select: '-password -permissions -RecentFiles -Labs -createdAt -updatedAt',
        },
        {
            path: 'Files',
        },
    ],
}

module.exports = { 
    REPORT_FIELDS
}