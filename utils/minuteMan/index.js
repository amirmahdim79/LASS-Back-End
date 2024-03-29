const { User } = require("../../models/user")

const MINUTE_MAN = {
    updateSand: async () => {
        const users = await User.find({
            isActive: true
        })

        for (const user of users) {
            user.sand -= 1;
            //notify supervisor if sand is negative
            await user.save();
        }
    },
}

module.exports = {
    MINUTE_MAN
}