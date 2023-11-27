const GROUP_FIELDS = {
    CREATE: [
        'Users',
        'name',
        'desc',
        'Lab',
    ],
    INFO: [
        'Users',
        'name',
        'desc',
        'Lab',
        '_id',
    ],
    POPULATE: [
        {
            path: 'Users',
            select: '-password -permissions',
        },
    ],
}

module.exports = { 
    GROUP_FIELDS
}