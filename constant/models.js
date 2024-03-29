const MODELS = {
    USER: 'User',
    LAB: 'Lab',
    LOG: 'Log',
    DATA: 'Data',
    SUPERVISOR: 'Supervisor',
    MILESTONE: 'Milestone',
    ADMIN: 'Admin',
    PATH: 'Path',
    TASK: 'Task',
    FILE: 'File',
    TAG: 'Tag',
    EVENT: 'Event',
    GROUP: 'Group',
    FORUM: 'Forum',
    REPORT: 'Report',
    CONSTANT: 'Constant',
    USER_TASK: 'UserTask',
    SUPS_TASK: 'SupsTask',
    ACTIVITY: 'Activity',
    DOCUMENT: 'Document',
    BOUNTY: 'Bounty',
    NOTIFICATION: 'Notification',
}

const TYPES = ['undergrad', 'masters', 'phd', 'postDoc', 'intern']

const INITIATOR_TYPES = [
    MODELS.USER,
    MODELS.SUPERVISOR,
]

const USER_ELIGIBILITY = {
    'ai': 1,
    'undergrad': 1,
    'masters': 2,
    'phd': 3,
    'postDoc': 4,
    'supervisor': 10,
}

const SUBMODELS = {
    MILESTONE_STATUS: 'MilestoneStatus',
    TASK_STATUS: 'TaskStatus',
    LAB_ENROLLMENT: 'Enrollment',
    TAG_VOTE: 'Vote',
    MESSAGE: 'Message',
    PRESENCE_FORM: 'PresenceForm',
}

module.exports = {
    MODELS,
    SUBMODELS,
    TYPES,
    USER_ELIGIBILITY,
    INITIATOR_TYPES,
}