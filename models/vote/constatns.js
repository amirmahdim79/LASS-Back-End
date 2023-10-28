const VOTE_FIELDS = {
    CREATE: [
        'Tag',
        'User',
        'userType',
    ],
    INFO: [
        'Tag',
        'User',
        'userType',
        '_id',
    ],
    POPULATE: [
        {
            path: 'Tag',
        },
    ],
}

module.exports = { 
    VOTE_FIELDS
}