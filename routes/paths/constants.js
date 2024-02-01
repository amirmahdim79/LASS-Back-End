const MESSAGES = {
    LAB_NOT_FOUND: 'Lab not found.',
}

const PATH_FIELDS = {
    CREATE: [
        'name',
        'desc',
        'typeDependency',
        'sandGain',
    ],
    CREATE_RES: [
        'Lab',
        'name',
        'desc',
        'typeDependency',
        'url',
        'sandGain',
        '_id',
    ],
    INFO: [
        'Lab',
        'name',
        'desc',
        'typeDependency',
        'Milestones',
        'url',
        'sandGain',
        '_id',
    ]
}

module.exports = { 
    MESSAGES,
    PATH_FIELDS,
}