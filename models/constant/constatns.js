const CONSTANT_FIELDS = {
    CREATE: [
        'key',
        'string',
        'boolean',
        'array',
        'object',
    ],
    INFO: [
        'key',
        'string',
        'boolean',
        'array',
        'object',
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
    CONSTANT_FIELDS,
}