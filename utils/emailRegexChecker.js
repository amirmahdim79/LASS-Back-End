const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const checkEmailFormat = (email) => {
    if (!email) return false
    return emailRegex.test(email)
}

module.exports = {
    checkEmailFormat
}