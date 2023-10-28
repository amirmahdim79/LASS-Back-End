const TAG_FIELDS = {
    CREATE: [
        'File',
        'name',
        'score',
        'Initiator',
    ],
    INFO: [
        'VoteList',
        'Initiator',
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