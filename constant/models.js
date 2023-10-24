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
}

const TYPES = ['undergrad', 'masters', 'phd', 'postDoc', 'intern']

const USER_ELIGIBILITY = {
    'undergrad': 1,
    'masters': 2,
    'phd': 3,
    'postDoc': 4,
    'supervisor': 10,
}

const SUBMODELS = {
    MILESTONE_STATUS: 'MilestoneStatus',
    TASK_STATUS: 'TaskStatus',
}

module.exports = {
    MODELS,
    SUBMODELS,
    TYPES,
    USER_ELIGIBILITY,
}