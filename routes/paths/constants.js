const MESSAGES = {
    LAB_NOT_FOUND: 'Lab not found.',
}

const PATH_FIELDS = {
    CREATE: [
        'name',
        'desc',
        'typeDependency',
    ],
    CREATE_RES: [
        'Lab',
        'name',
        'desc',
        'typeDependency',
        'url',
    ],
    INFO: [
        'Lab',
        'name',
        'desc',
        'typeDependency',
        'Milestones',
        'url',
    ]
}

module.exports = { 
    MESSAGES,
    PATH_FIELDS,
}