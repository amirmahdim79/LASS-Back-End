const PRESENCE_FORM_FIELDS = {
    CREATE: [
        'Forum',
        'Users',
    ],
    INFO: [
        'Forum',
        'Users',
        '_id',
    ],
    POPULATE: [
        // {
        //     path: 'Users',
        //     select: '-password -permissions -RecentFiles -Labs -createdAt -updatedAt',
        // },
    ],
}

const PRESENCE_STATUS = [
    'present',
    'absent',
    'optional',
] 

module.exports = { 
    PRESENCE_FORM_FIELDS,
    PRESENCE_STATUS
}