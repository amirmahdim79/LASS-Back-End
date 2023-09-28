const generateRandNum = (digits) => {
    const min = Math.pow(10, digits - 1); // Minimum number based on the number of digits
    const max = Math.pow(10, digits) - 1; // Maximum number based on the number of digits
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    generateRandNum
}