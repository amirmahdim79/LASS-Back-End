const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { Tag } = require('../../models/tag');

//seaarch tags
const searchTags = async (req, res) => {
    const query = req.query.query || ''

    const matchingTags = await Tag.find({
        name: {
          $regex: query,
          $options: 'i',
        },
    });

    const uniqueTags = new Set();

    matchingTags.forEach((tag) => {
        uniqueTags.add(tag.name);
    });

    const tagList = Array.from(uniqueTags);

    res.send(tagList)
}

module.exports = {
    searchTags,
}