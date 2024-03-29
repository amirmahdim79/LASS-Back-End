const BOUNTY_FIELDS = {
    CREATE: [
        'Lab',
        'PotentialList',
        'name',
        'smarties',
        'desc',
        'hasFile',
    ],
    INFO: [
        'User',
        'Lab',
        'PotentialList',
        'name',
        'smarties',
        'desc',
        'hasFile',
        'status',
        'File',
        '_id',
    ],
    POPULATE: [
        {
            path: 'User',
            select: '-password -permissions -RecentFiles',
        },
        {
            path: 'PotentialList',
            select: '-password -permissions -RecentFiles',
        },
        {
            path: 'File',
        },
    ],
}

const BOUNTY_TYPES = [
    'done',
    'doing',
    'none'
]

module.exports = { 
    BOUNTY_FIELDS,
    BOUNTY_TYPES
}