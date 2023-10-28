const TAG_FIELDS = {
    CREATE: [
        'File',
        'name',
        'score',
    ],
    INFO: [
        'VoteList',
        'File',
        'name',
        'score',
        '_id',
    ],
    POPULATE: [
        {
            path: 'VoteList',
        },
        {
            path: 'File',
        },
    ],
}

module.exports = { 
    TAG_FIELDS
}